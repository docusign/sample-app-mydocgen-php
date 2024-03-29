<?php

namespace App\Services\DocuSign;

use DocuSign\eSign\Model\DocGenFormField;
use DocuSign\eSign\Model\DocGenFormFieldRequest;
use DocuSign\eSign\Model\DocGenFormFieldResponse;
use DocuSign\eSign\Model\DocGenFormFields;
use DocuSign\eSign\Model\Envelope as DocuSignEnvelope;
use DocuSign\eSign\Api\EnvelopesApi;
use DocuSign\eSign\Model\EnvelopeUpdateSummary;
use DocuSign\eSign\Client\ApiException;

/**
 * Class EnvelopeService
 *
 * @package App\Services\DocuSign
 */
class EnvelopeService
{
    /**
     * @throws ApiException
     */
    public function sendEnvelope(string $envelopeId): EnvelopeUpdateSummary
    {
        return app(EnvelopesApi::class)->update(
            config('settings.docusign.account_id'),
            $envelopeId,
            new DocuSignEnvelope(['status' => 'sent'])
        );
    }

    /**
     * @param string $envelopeId
     * @param string $documentId
     * @param array $fields - ['docGenFormFieldName' => 'docGenFormFieldValue']
     * @return DocGenFormFieldResponse
     * @throws ApiException
     */
    public function updateDocFields(string $envelopeId, string $documentId, array $fields): DocGenFormFieldResponse
    {
        $docGenFormFieldRequest = new DocGenFormFieldRequest([
            'doc_gen_form_fields' => [
                new DocGenFormFields([
                    'document_id' => $documentId,
                    'doc_gen_form_field_list' => array_map(
                        fn (string $key, $value) => new DocGenFormField([
                            'name' => $key,
                            'value' => $value,
                        ]),
                        array_keys($fields),
                        array_values($fields)
                    ),
                ]),
            ],
        ]);

        return app(EnvelopesApi::class)
            ->updateEnvelopeDocGenFormFields(
                config('settings.docusign.account_id'),
                $envelopeId,
                $docGenFormFieldRequest
            );
    }
}
