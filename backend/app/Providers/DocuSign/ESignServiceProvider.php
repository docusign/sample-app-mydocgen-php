<?php

namespace App\Providers\DocuSign;

use App\Services\DocuSign\AuthService;
use DocuSign\eSign\Api\BulkEnvelopesApi;
use DocuSign\eSign\Api\EnvelopesApi;
use DocuSign\eSign\Api\TemplatesApi;
use DocuSign\eSign\Client\ApiClient;
use DocuSign\eSign\Configuration;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\ServiceProvider;

class ESignServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->app->singleton(ApiClient::class, function () {
            $configuration = new Configuration();
            $configuration->setHost(config('settings.docusign.base_url'));

            // cache TTL should be less that GWT TTL to prevent problems with expired token usage
            $ttlInSeconds = 60 * (AuthService::TOKEN_TTL_IN_MINUTES - 5);
            $accessToken = Cache::remember('docusign_jwt_token', $ttlInSeconds, function () {
                $authService = app(AuthService::class);

                $response = $authService->requestToken(config('settings.docusign.user_id'));

                return $response->getAccessToken();
            });

            $configuration->addDefaultHeader('Authorization', "Bearer $accessToken");

            return new ApiClient($configuration);
        });

        $this->app->bind(TemplatesApi::class, fn () => new TemplatesApi(app(ApiClient::class)));
        $this->app->bind(EnvelopesApi::class, fn () => new EnvelopesApi(app(ApiClient::class)));
        $this->app->bind(BulkEnvelopesApi::class, fn () => new BulkEnvelopesApi(app(ApiClient::class)));
    }
}
