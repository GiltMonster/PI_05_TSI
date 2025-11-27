<?php

return [
    /*
    |--------------------------------------------------------------------------
    | CORS Configuration
    |--------------------------------------------------------------------------
    | Define regras globais para Cross-Origin Resource Sharing.
    | FRONTEND_URL deve estar definido no ambiente de produção.
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [env('FRONTEND_URL', '*')],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => ['Content-Disposition'],

    'max_age' => 3600,

    'supports_credentials' => true,
];
