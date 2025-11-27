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

    // Permite múltiplas origens via env ALLOWED_ORIGINS separado por vírgulas
    'allowed_origins' => array_map('trim', explode(',', env('ALLOWED_ORIGINS', 'http://localhost:4200,https://prismapet.up.railway.app'))),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => ['Content-Disposition'],

    'max_age' => 3600,

    // Use true apenas se usar cookies; com '*' isso quebra o CORS
    'supports_credentials' => false,
];
