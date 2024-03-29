<?php

namespace Database\Seeders;

use App\Models\Option;
use DocuSign\eSign\Api\TemplatesApi;
use DocuSign\eSign\Model\Document;
use DocuSign\eSign\Model\EnvelopeDefinition;
use DocuSign\eSign\Model\EnvelopeTemplate;
use DocuSign\eSign\Model\RecipientAdditionalNotification;
use DocuSign\eSign\Model\Recipients;
use DocuSign\eSign\Model\Signer;
use DocuSign\eSign\Model\SignerAttachment;
use DocuSign\eSign\Model\SignHere;
use DocuSign\eSign\Model\TemplateTabs;
use Illuminate\Database\Seeder;

class Scenario3TemplateSeeder extends Seeder
{
    /**
     * @param TemplatesApi $templatesApi
     * @return void
     * @throws \DocuSign\eSign\Client\ApiException
     */
    public function run(TemplatesApi $templatesApi): void
    {
        $accountId = config('settings.docusign.account_id');

        $signer = new Signer([
            'role_name'                => 'signer',
            'recipient_id'             => '1',
            'routing_order'            => '1',
            'additional_notifications' => [
                new RecipientAdditionalNotification([
                    'secondary_delivery_method' => 'SMS',
                ]),
            ],
        ]);

        $envelopeTemplate = new EnvelopeTemplate([
            'name'          => 'MyDocGen - Legal form',
            'description'   => 'Example template created via the API',
            'email_subject' => 'Please sign this document',
            'status'        => 'created',
            'recipients'    => new Recipients([
                'signers' => [$signer],
            ]),
        ]);

        $templateSummary = $templatesApi->createTemplate($accountId, $envelopeTemplate);

        $pathToFile = resource_path('samples/3/legal_form.docx');
        $document   = new Document([
            'name'            => pathinfo($pathToFile)['basename'],
            'document_base64' => base64_encode(file_get_contents($pathToFile)),
            'file_extension'  => pathinfo($pathToFile)['extension'],
            'document_id'     => '1',
            'order'           => '1',
        ]);

        $templatesApi->updateDocument(
            $accountId,
            $document->getDocumentId(),
            $templateSummary->getTemplateId(),
            new EnvelopeDefinition([
                'documents' => [$document],
            ])
        );

        $templatesApi->createTabs(
            $accountId,
            $signer->getRecipientId(),
            $templateSummary->getTemplateId(),
            new TemplateTabs([
                'sign_here_tabs' => [
                    new SignHere([
                        'recipient_id'  => '1',
                        'document_id'   => '1',
                        'anchor_string' => '/ClientSignHere/',
                    ]),
                ],
                'signer_attachment_tabs' => [
                    new SignerAttachment([
                        'recipient_id'  => '1',
                        'document_id'   => '1',
                        'optional'      => 'true',
                        'anchor_string' => '/attachments/',
                    ]),
                ],
            ])
        );

        Option::updateOrCreate(
            ['name' => 'scenario_3_template_id'],
            ['value' => $templateSummary->getTemplateId()]
        );
    }
}
