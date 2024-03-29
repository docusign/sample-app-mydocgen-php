<?php

namespace App\Services\DocuSign;

use DocuSign\Admin\Client\ApiClient;
use DocuSign\Admin\Client\Auth\OAuth;
use DocuSign\Admin\Client\Auth\OAuthToken;
use Exception;

/**
 * Class AuthService
 *
 * @package App\Services\DocuSign
 */
class AuthService
{
    /**
     * TTL in minutes
     */
    public const TOKEN_TTL_IN_MINUTES = 60;

    /**
     * Scope for token
     */
    protected const SCOPE = [
        'signature',
        'organization_read',
        'permission_read',
        'user_write',
        'group_read',
        'user_read',
        'account_read',
        'domain_read',
        'identity_provider_read',
    ];

    /**
     * Request token from a server
     *
     * @param string $userId
     * @return OAuthToken|null
     * @throws Exception
     */
    public function requestToken(string $userId): ?OAuthToken
    {
        $apiClient = new ApiClient(null, $this->getOAuth());

        try {
            return $apiClient->requestJWTUserToken(
                config('settings.docusign.client_id'),
                $userId,
                $this->getPrivateKey(),
                self::SCOPE,
                self::TOKEN_TTL_IN_MINUTES
            )[0];
        } catch (Exception $e) {
            if (str_contains($e->getMessage(), 'consent_required')) {
                $authorizationURL = config('settings.docusign.account_url') . '/oauth/auth?' . http_build_query(
                        [
                            'scope'         => "impersonation+" . implode(' ', self::SCOPE),
                            'redirect_uri'  => route('callback-url'),
                            'client_id'     => config('settings.docusign.client_id'),
                            'response_type' => 'code',
                        ]
                    );

                throw new Exception("Paste URL '$authorizationURL' into browser");
            } else {
                throw new Exception($e->getMessage());
            }
        }
    }

    /**
     * Get oAuth instance
     *
     * @return OAuth
     */
    protected function getOAuth(): OAuth
    {
        $oAuth = app(OAuth::class);
        $oAuth->setOAuthBasePath(config('settings.docusign.account_url'));

        return $oAuth;
    }

    /**
     * Get private key
     *
     * @return string
     */
    protected function getPrivateKey(): string
    {
        return file_get_contents(storage_path(config('settings.docusign.private_key_path')), true);
    }
}
