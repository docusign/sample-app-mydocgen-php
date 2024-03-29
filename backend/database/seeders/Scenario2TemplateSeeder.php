<?php

namespace Database\Seeders;

use App\Models\Option;
use DocuSign\eSign\Api\TemplatesApi;
use DocuSign\eSign\Model\Document;
use DocuSign\eSign\Model\EnvelopeDefinition;
use DocuSign\eSign\Model\EnvelopeTemplate;
use DocuSign\eSign\Model\Recipients;
use DocuSign\eSign\Model\Signer;
use DocuSign\eSign\Model\SignHere;
use DocuSign\eSign\Model\TemplateTabs;
use Illuminate\Database\Seeder;

class Scenario2TemplateSeeder extends Seeder
{
    /**
     * @param TemplatesApi $templatesApi
     * @return void
     * @throws \DocuSign\eSign\Client\ApiException
     */
    public function run(TemplatesApi $templatesApi): void
    {
        $accountId = config('settings.docusign.account_id');

        $signer  = new Signer(['role_name' => 'signer', 'recipient_id' => '1', 'routing_order' => '2']);
        $manager = new Signer(['role_name' => 'manager', 'recipient_id' => '2', 'routing_order' => '1']);

        $envelopeTemplate = new EnvelopeTemplate([
            'name'          => 'MyDocGen - HR offer letter',
            'description'   => 'Example template created via the API',
            'email_subject' => 'Please sign this document',
            'status'        => 'created',
            'recipients'    => new Recipients([
                'signers' => [$signer, $manager],
            ]),
        ]);

        $templateSummary = $templatesApi->createTemplate($accountId, $envelopeTemplate);

        $pathToFile = resource_path('samples/2/hr_offer_letter.docx');
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
                        'recipient_id'  => $signer->getRecipientId(),
                        'document_id'   => '1',
                        'anchor_string' => '/CandidateSignature/',
                    ])
                ],
            ])
        );

        $templatesApi->createTabs(
            $accountId,
            $manager->getRecipientId(),
            $templateSummary->getTemplateId(),
            new TemplateTabs([
                'sign_here_tabs' => [
                    new SignHere([
                        'recipient_id'  => $manager->getRecipientId(),
                        'document_id'   => '1',
                        'anchor_string' => '/ManagerSignature/',
                    ]),
                ],
            ])
        );

        Option::updateOrCreate(
            ['name' => 'scenario_2_template_id'],
            ['value' => $templateSummary->getTemplateId()]
        );
    }
}
