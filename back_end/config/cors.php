<?php

return [
    /*
    |--------------------------------------------------------------------------
    | CORS Configuration
    |--------------------------------------------------------------------------
    | Define regras globais para Cross-Origin Resource Sharing.
    | FRONTEND_URL deve estar definido no ambiente de produção.
    */

    'paths' => ['*'],

    'allowed_methods' => ['*'],

    // Permite múltiplas origens via env ALLOWED_ORIGINS separado por vírgulas
    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => ['Content-Disposition'],

    'max_age' => 3600,

    // Use true apenas se usar cookies; com '*' isso quebra o CORS
    'supports_credentials' => false,
];
