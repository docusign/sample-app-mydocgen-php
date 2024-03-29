<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;
use App\Http\Requests\Api\Scenario2Request;
use App\Models\Option;
use App\Services\DocuSign\TemplateService;
use DocuSign\eSign\Api\BulkEnvelopesApi;
use DocuSign\eSign\Api\EnvelopesApi;
use DocuSign\eSign\Model\BulkSendingCopy;
use DocuSign\eSign\Model\BulksendingCopyDocGenFormField;
use DocuSign\eSign\Model\BulkSendingCopyRecipient;
use DocuSign\eSign\Model\BulkSendingList;
use DocuSign\eSign\Model\BulkSendRequest;
use DocuSign\eSign\Model\CustomFields;
use DocuSign\eSign\Model\EnvelopeDefinition;
use DocuSign\eSign\Model\TextCustomField;
use Illuminate\Http\JsonResponse;

class Scenario2Controller extends BaseController
{
    /**
     * @param TemplateService $templateService
     * @return JsonResponse
     * @throws \DocuSign\eSign\Client\ApiException
     */
    public function getTemplatePreviewUrl(TemplateService $templateService): JsonResponse
    {
        $templateId = Option::where('name', 'scenario_2_template_id')->first()->value;
        $viewUrl    = $templateService->createTemplateRecipientPreview($templateId);

        return response()->json($viewUrl->getUrl());
    }

    /**
     * @param Scenario2Request $request
     * @param EnvelopesApi $envelopesApi
     * @param BulkEnvelopesApi $bulkEnvelopesApi
     * @return JsonResponse
     * @throws \DocuSign\eSign\Client\ApiException
     */
    public function create(
        Scenario2Request $request,
        EnvelopesApi $envelopesApi,
        BulkEnvelopesApi $bulkEnvelopesApi
    ): JsonResponse {
        $accountId  = config('settings.docusign.account_id');
        $formData   = $request->validated();
        $templateId = Option::where('name', 'scenario_2_template_id')->first()->value;

        $envelopeDefinition = new EnvelopeDefinition([
            'template_id' => $templateId,
            'status'      => 'created',
        ]);

        $envelopeSummary = $envelopesApi->createEnvelope($accountId, $envelopeDefinition);

        $docFieldNameToApplicantValueKeyMap = [
            'position'   => 'position',
            'start_date' => 'start_date',
            'salary'     => 'salary',
        ];

        $bulkSendingCopies = collect($formData['applicants'])
            ->map(function (array $applicantData) use ($formData, $docFieldNameToApplicantValueKeyMap) {
                return new BulkSendingCopy([
                    'recipients' => [
                        new BulkSendingCopyRecipient([
                            'role_name' => 'signer',
                            'name'      => $applicantData['full_name'],
                            'email'     => $applicantData['email'],
                        ]),

                        new BulkSendingCopyRecipient([
                            'role_name' => 'manager',
                            'name'      => $formData['manager']['full_name'],
                            'email'     => $formData['manager']['email'],
                        ]),
                    ],

                    'doc_gen_form_fields' => array_map(
                        fn (string $key, string $formDataKey) => new BulksendingCopyDocGenFormField([
                            'name' => $key,
                            'value' => $applicantData[$formDataKey],
                        ]),
                        array_keys($docFieldNameToApplicantValueKeyMap),
                        array_values($docFieldNameToApplicantValueKeyMap)
                    ),
                ]);
            });

        $bulkSendingList = $bulkEnvelopesApi->createBulkSendList(
            $accountId,
            new BulkSendingList(['name' => 'applicants', 'bulk_copies' => $bulkSendingCopies->toArray()])
        );

        $textCustomField = new TextCustomField([
            'name'     => 'mailingListId',
            'required' => 'false',
            'show'     => 'false',
            'value'    => $bulkSendingList->getListId(),
        ]);

        $envelopesApi->createCustomFields(
            $accountId,
            $envelopeSummary->getEnvelopeId(),
            new CustomFields(['text_custom_fields' => [$textCustomField]])
        );

        $bulkSendRequest = new BulkSendRequest(['envelope_or_template_id' => $envelopeSummary->getEnvelopeId()]);

        $bulkSendResponse = $bulkEnvelopesApi->createBulkSendRequest(
            $accountId,
            $bulkSendingList->getListId(),
            $bulkSendRequest
        );

        $bulkEnvelopesApi->getBulkSendBatchStatus($accountId, $bulkSendResponse->getBatchId());

        return response()->json();
    }
}
