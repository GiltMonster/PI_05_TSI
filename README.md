# PI_05_TSI – Prisma Pet

Aplicação full‑stack para gestão de clínica veterinária, composta por um backend Laravel e um frontend Angular, organizada em monorepo.

## Stack

- **Back‑end:** Laravel 11 (PHP), Sanctum, Spatie Permissions, PHPUnit
- **Front‑end:** Angular, Angular Material
- **Infra:** Railway (deploy front e API), Dockerfile + `deploy.sh`

## Arquitetura

- `back_end/` (API REST): autenticação, controle de acesso por papéis (`admin`, `vet`, `user`), gerenciamento de pets, consultas, vacinas, prescrições e serviços.
- `front_end/prisma_pet/` (SPA): portal com fluxos para administrador, veterinário e tutor, consumo da API e UI responsiva.

## Funcionalidades Principais

- **Autenticação:** login/logout, `me`, verificação de token e tipo de usuário.
- **Admin:** CRUD de veterinários, clientes, pets e serviços.
- **Veterinário:** cadastro/edição de pets, consultas e vacinas; prescrições com anexo.
- **Tutor:** visualização/edição de dados do pet, histórico (consultas, vacinas, prescrições).
- **Anexos de Prescrição:** upload e download de arquivos vinculados ao pet/prescrição.


## Arquivos (uploads)

- Local de armazenamento: `storage/app/private/uploads`
- Padrão de nome: `PETID_PRESCRICAOID_nomeOriginal.ext`
- Download: via `GET /api/file/download/{filename}` (stream pelo Laravel)
- CORS: configurado globalmente em `config/cors.php` (utilizar `ALLOWED_ORIGINS` no ambiente)

## Execução Local (resumo)

Back‑end
```zsh
cd back_end
cp .env.example .env   # configure DB e ALLOWED_ORIGINS
composer install
php artisan key:generate
php artisan migrate
php artisan serve --host=127.0.0.1 --port=8000
```

Front‑end
```zsh
cd front_end/prisma_pet
npm install
npm start   # ou: ng serve --open
```

Por padrão o front consome `http://127.0.0.1:8000/api` em desenvolvimento. Em produção, utilize os domínios HTTPS do Railway.

## Deploy no Railway (API)

- Container inicia via `deploy.sh` e servidor embutido do PHP:
  - `php -S 0.0.0.0:8080 -t public public/index.php` (roteador habilitado)
- Variáveis sugeridas:
  - `APP_ENV=production`
  - `APP_URL=https://<SEU-DOMINIO-API>`
  - `ALLOWED_ORIGINS=https://<SEU-DOMINIO-FRONT>,http://localhost:4200`
  - (Banco, etc.)

## Notas de CORS

- Configuração global em `config/cors.php` (use `ALLOWED_ORIGINS`).
- Para download no navegador, o front abre o link direto (`window.open`), evitando preflight (assim não há bloqueio CORS).
