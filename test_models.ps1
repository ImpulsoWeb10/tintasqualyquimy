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

$models = @(
"anthropic/claude-3-haiku",
"openai/gpt-4o-mini",
"mistralai/mistral-small",
"qwen/qwen2.5-7b-instruct"
)

foreach ($model in $models) {

    Write-Host "`nTestando modelo: $model" -ForegroundColor Yellow

    $body = @{
        model = $model
        messages = @(
            @{
                role = "user"
                content = "Responda apenas OK"
            }
        )
    } | ConvertTo-Json -Depth 5

    try {
        Invoke-RestMethod `
        -Uri "https://openrouter.ai/api/v1/chat/completions" `
        -Method Post `
        -Headers @{
            Authorization = "Bearer $API_KEY"
            "Content-Type" = "application/json"
        } `
        -Body $body

        Write-Host "FUNCIONOU: $model" -ForegroundColor Green
    }
    catch {
        Write-Host "FALHOU: $model" -ForegroundColor Red
    }
}
