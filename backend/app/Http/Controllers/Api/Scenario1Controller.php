<?php

namespace App\Http\Controllers\Api;

use App\DTO\Address;
use App\Http\Controllers\BaseController;
use App\Http\Requests\Api\Scenario1Request;
use App\Models\Option;
use App\Services\DocuSign\EnvelopeService;
use App\Services\DocuSign\TemplateService;
use DocuSign\eSign\Api\EnvelopesApi;
use DocuSign\eSign\Model\CarbonCopy;
use DocuSign\eSign\Model\EnvelopeDefinition;
use DocuSign\eSign\Model\RecipientViewRequest;
use DocuSign\eSign\Model\Signer;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Arr;

class Scenario1Controller extends BaseController
{
    /**
     * @param TemplateService $templateService
     * @return JsonResponse
     * @throws \DocuSign\eSign\Client\ApiException
     */
    public function getTemplatePreviewUrl(TemplateService $templateService): JsonResponse
    {
        $templateId = Option::where('name', 'scenario_1_template_id')->first()->value;
        $viewUrl    = $templateService->createTemplateRecipientPreview($templateId);

        return response()->json($viewUrl->getUrl());
    }

    /**
     * @param Scenario1Request $request
     * @param EnvelopesApi $envelopesApi
     * @param EnvelopeService $envelopeService
     * @return JsonResponse
     * @throws \DocuSign\eSign\Client\ApiException
     */
    public function create(
        Scenario1Request $request,
        EnvelopesApi $envelopesApi,
        EnvelopeService $envelopeService
    ): JsonResponse {
        $accountId  = config('settings.docusign.account_id');
        $formData   = $request->validated();
        $templateId = Option::where('name', 'scenario_1_template_id')->first()->value;

        $fullName = Arr::get($formData, 'customer.first_name') . ' ' . Arr::get($formData, 'customer.last_name');
        $signer   = new Signer([
            'email'          => Arr::get($formData, 'customer.email'),
            'name'           => $fullName,
            'role_name'      => 'signer',
            'recipient_id'   => '1',
            'client_user_id' => '1',
        ]);

        $cc = new CarbonCopy([
            'role_name'    => 'cc',
            'recipient_id' => '2',
            'email'        => Arr::get($formData, 'lender.email'),
            'name'         => Arr::get($formData, 'lender.first_name') . ' ' . Arr::get($formData, 'lender.last_name'),
        ]);

        $envelopeDefinition = new EnvelopeDefinition([
            'template_id'    => $templateId,
            'template_roles' => [$signer, $cc],
            'status'         => 'created',
        ]);

        $envelopeSummary   = $envelopesApi->createEnvelope($accountId, $envelopeDefinition);
        $docFieldsResponse = $envelopesApi->getEnvelopeDocGenFormFields($accountId, $envelopeSummary->getEnvelopeId());

        $address = new Address(
            Arr::get($formData, 'address.country'),
            Arr::get($formData, 'address.state'),
            Arr::get($formData, 'address.city'),
            Arr::get($formData, 'address.postal_code'),
            Arr::get($formData, 'address.line_1'),
            Arr::get($formData, 'address.line_2')
        );

        $docFieldNameToValueMap = [
            'current_date'     => today()->format('m-d-Y'),
            'borrower_name'    => $fullName,
            'borrower_address' => $address->toString(),
            'loan_amount'      => Arr::get($formData, 'loan.amount'),
            'loan_rate'        => Arr::get($formData, 'loan.rate'),
            'loan_due_date'    => Arr::get($formData, 'loan.due_date'),
            'monthly_payment'  => Arr::get($formData, 'loan.monthly_payment'),
            'payment_day'      => Arr::get($formData, 'loan.monthly_payment_day'),
            'late_fee_amount'  => Arr::get($formData, 'loan.penalty_amount'),
            'governing_law'    => Arr::get($formData, 'address.state'),
        ];

        $envelopeService->updateDocFields(
            $envelopeSummary->getEnvelopeId(),
            $docFieldsResponse['doc_gen_form_fields'][0]['document_id'],
            $docFieldNameToValueMap
        );

        $envelopeService->sendEnvelope($envelopeSummary->getEnvelopeId());

        $recipientViewRequest = new RecipientViewRequest([
            'authentication_method' => 'None',
            'client_user_id'        => $signer->getClientUserId(),
            'recipient_id'          => $signer->getRecipientId(),
            'return_url'            => route('home'),
            'user_name'             => $fullName,
            'email'                 => Arr::get($formData, 'customer.email'),
        ]);

        $viewUrl = $envelopesApi->createRecipientView(
            $accountId,
            $envelopeSummary->getEnvelopeId(),
            $recipientViewRequest
        );

        return response()->json($viewUrl->getUrl());
    }
}

