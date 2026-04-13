# Rafa Jr no WhatsApp (MVP)

## 1) Configurar variaveis
1. Copie `.env.example` para `.env`.
2. Preencha:
- `VERIFY_TOKEN`: token livre escolhido por voce.
- `WHATSAPP_ACCESS_TOKEN`: token da Meta (Cloud API).
- `WHATSAPP_PHONE_NUMBER_ID`: ID do numero da Cloud API.
- `OPENROUTER_API_KEY`: sua chave atual.
- `OPENROUTER_MODEL`: pode manter `openai/gpt-4o-mini`.

## 2) Rodar servidor
```powershell
npm start
```

Saude local:
- `http://localhost:3000/health`

## 3) Expor localhost para internet
Use ngrok:
```powershell
ngrok http 3000
```

Copie a URL HTTPS gerada, ex:
- `https://abc123.ngrok-free.app`

## 4) Configurar Webhook na Meta
No app da Meta (WhatsApp Cloud API):
1. Callback URL: `https://SUA_URL_NGROK/webhook`
2. Verify Token: mesmo valor de `VERIFY_TOKEN`
3. Assinar campo: `messages`

## 5) Adicionar numero de teste
No WhatsApp Cloud API, adicione seu numero pessoal em "recipient" permitido (modo teste).

## 6) Testar mensagem real
1. Envie "Oi" para o numero de teste da Meta.
2. O webhook recebe, chama OpenRouter e responde no seu WhatsApp.

## 7) Problemas comuns
- 403 na verificacao: `VERIFY_TOKEN` divergente.
- Nao responde: URL do ngrok mudou e nao foi atualizada na Meta.
- Erro 401/403 envio: token da Meta expirou.
- Erro OpenRouter: chave invalida ou limite do modelo.
