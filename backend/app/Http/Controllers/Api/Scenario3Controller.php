<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;
use App\Http\Requests\Api\Scenario3Request;
use App\Models\Option;
use App\Services\DocuSign\EnvelopeService;
use App\Services\DocuSign\TemplateService;
use DocuSign\eSign\Api\EnvelopesApi;
use DocuSign\eSign\Model\EnvelopeDefinition;
use DocuSign\eSign\Model\RecipientAdditionalNotification;
use DocuSign\eSign\Model\RecipientPhoneNumber;
use DocuSign\eSign\Model\RecipientViewRequest;
use DocuSign\eSign\Model\Signer;
use Illuminate\Http\JsonResponse;

class Scenario3Controller extends BaseController
{
    /**
     * @param TemplateService $templateService
     * @return JsonResponse
     * @throws \DocuSign\eSign\Client\ApiException
     */
    public function getTemplatePreviewUrl(TemplateService $templateService): JsonResponse
    {
        $templateId = Option::where('name', 'scenario_3_template_id')->first()->value;
        $viewUrl    = $templateService->createTemplateRecipientPreview($templateId);

        return response()->json($viewUrl->getUrl());
    }

    /**
     * @param Scenario3Request $request
     * @param EnvelopesApi $envelopesApi
     * @param EnvelopeService $envelopeService
     * @return JsonResponse
     * @throws \DocuSign\eSign\Client\ApiException
     */
    public function create(
        Scenario3Request $request,
        EnvelopesApi $envelopesApi,
        EnvelopeService $envelopeService
    ): JsonResponse {
        $accountId   = config('settings.docusign.account_id');
        $formDataDto = $request->toDto();
        $templateId  = Option::where('name', 'scenario_3_template_id')->first()->value;

        $signer = new Signer([
            'email'        => $formDataDto->client->email,
            'name'         => $formDataDto->client->getFullName(),
            'role_name'    => 'signer',
            'recipient_id' => '1',
            'additional_notifications' => [
                new RecipientAdditionalNotification([
                    'secondary_delivery_method' => 'SMS',
                    'phone_number' => new RecipientPhoneNumber([
                        'country_code' => $formDataDto->client->phoneNumber->toLibPhoneObject()->getCountryCode(),
                        'number'       => $formDataDto->client->phoneNumber->toLibPhoneObject()->getNationalNumber(),
                    ]),
                ]),
            ],
        ]);

        $envelopeDefinition = new EnvelopeDefinition([
            'template_id'    => $templateId,
            'template_roles' => [$signer],
            'status'         => 'created',
        ]);

        $envelopeSummary   = $envelopesApi->createEnvelope($accountId, $envelopeDefinition);
        $docFieldsResponse = $envelopesApi->getEnvelopeDocGenFormFields($accountId, $envelopeSummary->getEnvelopeId());

        $docFieldNameToValueMap = [
            'full_name' => $formDataDto->client->getFullName(),
            'address'   => $formDataDto->client->address->toString(),
            'phone'     => $formDataDto->client->phoneNumber->getRawNumber(),
            'email'     => $formDataDto->client->email,

            'job_status'                    => $formDataDto->survey->jobStatus,
            'applied_to_available_position' => $formDataDto->survey->appliedToAvailablePosition,
            'worked_here_before'            => $formDataDto->survey->workedHereBefore,
            'start_date'                    => $formDataDto->survey->startDate,
            'still_employed'                => $formDataDto->survey->stillEmployed,
            'last_employed_date'            => $formDataDto->survey->lastEmployedDate,
            'leaving_reason'                => $formDataDto->survey->leavingReason,
            'leaving_reason_description'    => $formDataDto->survey->leavingDescription,
            'responsibility'                => $formDataDto->survey->responsibility,

            'company_name'         => $formDataDto->employer->companyName,
            'company_contact_name' => $formDataDto->employer->contactName,
            'company_address'      => $formDataDto->employer->address->toString(),
            'company_phone'        => $formDataDto->employer->phoneNumber->getRawNumber(),

            'work_address' => $formDataDto->workAddress->matches
                ? $formDataDto->employer->address->toString()
                : $formDataDto->workAddress->address->toString(),

            'violation_description'  => $formDataDto->appeal->description,
            'resolution_description' => $formDataDto->appeal->howToSolve,
         ];

        $envelopeService->updateDocFields(
            $envelopeSummary->getEnvelopeId(),
            $docFieldsResponse['doc_gen_form_fields'][0]['document_id'],
            $docFieldNameToValueMap
        );

        $envelopeService->sendEnvelope($envelopeSummary->getEnvelopeId());

        $recipientViewRequest = new RecipientViewRequest([
            'authentication_method' => 'None',
            'recipient_id'          => $signer->getRecipientId(),
            'return_url'            => route('home'),
            'user_name'             => $formDataDto->client->getFullName(),
            'email'                 => $formDataDto->client->email,
        ]);

        $viewUrl = $envelopesApi->createRecipientView(
            $accountId,
            $envelopeSummary->getEnvelopeId(),
            $recipientViewRequest
        );

        return response()->json($viewUrl->getUrl());
    }
}
