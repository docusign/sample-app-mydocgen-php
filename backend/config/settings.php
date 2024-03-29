<?php

return [
    /**
     * Login for manager
     */
    'manager_login' => env('MANAGER_LOGIN', 'test@mail.com'),

    /**
     * Password for manager
     */
    'manager_password' => env('MANAGER_PASSWORD', 'password'),

    /**
     * Count of generating employees for manager
     */
    'employees_count' => 10,

    /**
     * Auth configuration
     */
    'docusign' => [
        /**
         * Base URL
         */
        'base_url' => env('DOCUSIGN_BASE_URL'),

        /**
         * Account URL
         */
        'account_url' => 'account-d.docusign.com',

        /**
         * API URL
         */
        'api_url' => 'https://api-d.docusign.net/management',

        /**
         * Integration key (client ID)
         */
        'client_id' => env('DOCUSIGN_CLIENT_ID'),

        /**
         * Impersonated user ID
         */
        'user_id' => env('DOCUSIGN_USER_ID'),

        /**
         * Account ID
         */
        'account_id' => env('DOCUSIGN_ACCOUNT_ID'),

        /**
         * Organization ID
         */
        'organization_id' => env('DOCUSIGN_ORGANIZATION_ID'),

        /**
         * Refresh access token automatically, when it is expired
         */
        'refresh_token_automatically' => env('DOCUSIGN_REFRESH_TOKEN_AUTOMATICALLY', false),

        /**
         * Private key path
         */
        'private_key_path' => 'docusign_private.key',
    ],

    /**
     * Acting user email mask
     */
    'acting_user' => 'johnd+{KEY}@dsxtr.com',

    /**
     * Employees
     */
    'employees' => [
        ['name' => 'John Doe',           'email' => 'johnd+{KEY}@dsxtr.com',      'profile' => 'admin'],
        ['name' => 'Jane Smith',         'email' => 'janes+{KEY}@dsxtr.com',      'profile' => 'admin'],
        ['name' => 'Austin Adams',       'email' => 'austina+{KEY}@dsxtr.com',    'profile' => 'manager'],
        ['name' => 'Roy Riley',          'email' => 'royr+{KEY}@dsxtr.com',       'profile' => 'manager'],
        ['name' => 'James Jones',        'email' => 'jamesj+{KEY}@dsxtr.com',     'profile' => 'employee'],
        ['name' => 'Martin Mason',       'email' => 'martinm+{KEY}@dsxtr.com',    'profile' => 'employee'],
        ['name' => 'Douglas Davis',      'email' => 'dougd+{KEY}@dsxtr.com',      'profile' => 'employee'],
        ['name' => 'Manny Micheals',     'email' => 'mannym+{KEY}@dsxtr.com',     'profile' => 'employee'],
        ['name' => 'Alexander Anthony',  'email' => 'alexandera+{KEY}@dsxtr.com', 'profile' => 'employee'],
        ['name' => 'Gabby Griffin',      'email' => 'gabbyg+{KEY}@dsxtr.com',     'profile' => 'employee'],
    ],
];
