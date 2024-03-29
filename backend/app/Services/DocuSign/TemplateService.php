<?php

namespace App\Services\DocuSign;

use DocuSign\eSign\Api\TemplatesApi;
use DocuSign\eSign\Model\RecipientPreviewRequest;
use DocuSign\eSign\Model\ViewUrl;

class TemplateService
{
    /**
     * @param string $templateId
     * @return ViewUrl
     * @throws \DocuSign\eSign\Client\ApiException
     */
    public function createTemplateRecipientPreview(string $templateId): ViewUrl
    {
        return app(TemplatesApi::class)->createTemplateRecipientPreview(
            config('settings.docusign.account_id'),
            $templateId,
            new RecipientPreviewRequest([
                'authentication_method' => 'None',
                'return_url'            => route('home'),
            ])
        );
    }
}
