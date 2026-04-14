# ==========================================
# CHECK OPENROUTER MODELS
# ==========================================

$API_KEY = $env:OPENROUTER_API_KEY

if ([string]::IsNullOrWhiteSpace($API_KEY)) {
  $API_KEY = [Environment]::GetEnvironmentVariable("OPENROUTER_API_KEY", "User")
}

if ([string]::IsNullOrWhiteSpace($API_KEY)) {
  $API_KEY = [Environment]::GetEnvironmentVariable("OPENROUTER_API_KEY", "Machine")
}

if ([string]::IsNullOrWhiteSpace($API_KEY)) {
  Write-Host "Defina a variavel OPENROUTER_API_KEY antes de rodar." -ForegroundColor Red
  Write-Host "Exemplo: `$env:OPENROUTER_API_KEY=\"sk-or-...\"" -ForegroundColor Yellow
  exit 1
}

Write-Host "Buscando modelos disponiveis..." -ForegroundColor Cyan

$response = Invoke-RestMethod `
  -Uri "https://openrouter.ai/api/v1/models" `
  -Headers @{
      "Authorization" = "Bearer $API_KEY"
  }

$response.data | Select-Object id, context_length, pricing | Format-Table
