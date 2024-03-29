<?php

namespace Database\Seeders;

use App\Models\Option;
use DocuSign\eSign\Api\TemplatesApi;
use DocuSign\eSign\Model\CarbonCopy;
use DocuSign\eSign\Model\DateSigned;
use DocuSign\eSign\Model\Document;
use DocuSign\eSign\Model\EnvelopeDefinition;
use DocuSign\eSign\Model\EnvelopeTemplate;
use DocuSign\eSign\Model\Recipients;
use DocuSign\eSign\Model\Signer;
use DocuSign\eSign\Model\SignHere;
use DocuSign\eSign\Model\TemplateTabs;
use Illuminate\Database\Seeder;

class Scenario1TemplateSeeder extends Seeder
{
    /**
     * @param TemplatesApi $templatesApi
     * @return void
     * @throws \DocuSign\eSign\Client\ApiException
     */
    public function run(TemplatesApi $templatesApi): void
    {
        $accountId = config('settings.docusign.account_id');

        $signer           = new Signer(['role_name' => 'signer', 'recipient_id' => '1', 'routing_order' => '1']);
        $cc               = new CarbonCopy(['role_name' => 'cc', 'recipient_id' => '2', 'routing_order' => '2']);
        $envelopeTemplate = new EnvelopeTemplate([
            'name'          => 'MyDocGen - Personal loan agreement',
            'description'   => 'Example template created via the API',
            'email_subject' => 'Please sign this document',
            'status'        => 'created',
            'recipients'    => new Recipients([
                'signers'       => [$signer],
                'carbon_copies' => [$cc],
            ]),
        ]);

        $templateSummary = $templatesApi->createTemplate($accountId, $envelopeTemplate);

        $pathToFile = resource_path('samples/1/personal_loan_agreement.docx');
        $document   = new Document([
            'name'            => pathinfo($pathToFile)['basename'],
            'document_base64' => base64_encode(file_get_contents($pathToFile)),
            'file_extension'  => pathinfo($pathToFile)['extension'],
            'document_id'     => '1',
            'order'           => '1',
            'pages'           => '1',
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
                        'recipient_id'    => '1',
                        'document_id'     => '1',
                        'page_number'     => '1',
                        'anchor_string'   => 'Borrower’s Signature:',
                        'anchor_x_offset' => '150',
                        'anchor_y_offset' => '3',
                        'anchor_units'    => 'pixels',
                    ]),
                ],
                'date_signed_tabs' => [
                    new DateSigned([
                        'recipient_id'    => '1',
                        'document_id'     => '1',
                        'page_number'     => '1',
                        'anchor_string'   => 'Borrower’s Signature:',
                        'anchor_x_offset' => '320',
                        'anchor_y_offset' => '0',
                        'anchor_units'    => 'pixels',
                    ]),
                ],
            ])
        );

        Option::updateOrCreate(
            ['name' => 'scenario_1_template_id'],
            ['value' => $templateSummary->getTemplateId()]
        );
    }
}
