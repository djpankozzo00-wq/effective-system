# Helix Clone

Aplicação Next.js 15 com Prisma/PostgreSQL, painel administrativo, base de carteira e integração PIX SyncPay.

## Desenvolvimento
1. `npm install`
2. Copie `.env.example` para `.env` e preencha as variáveis.
3. `npx prisma generate`
4. `npm run db:push`
5. `npm run seed`
6. `npm run dev`

O seed exige `ADMIN_USERNAME` e `ADMIN_PASSWORD` (mínimo de 12 caracteres).

## Deploy na Vercel
Configure todas as variáveis do `.env.example` nas Environment Variables. Configure também `CRON_SECRET`. Depois faça o deploy e execute `npm run db:push` em ambiente controlado.

## Importante
- A integração SyncPay deve ser validada com a documentação e credenciais oficiais antes de produção.
- O webhook atual valida o segredo no caminho e credita depósitos de forma transacional/idempotente; confirme também a assinatura oficial do provedor, se disponível.
- O módulo de Telegram Mini App, fluxos completos de missões, criação de depósitos/saques, remarketing e publicação de posts ainda precisam ser conectados às regras finais do produto.
- `scripts/mirror-assets.sh` só deve ser executado se houver autorização para reutilizar os recursos da origem.
