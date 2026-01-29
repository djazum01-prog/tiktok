# TikTok App - Development Start Script (Windows PowerShell)
# Starts the Express server and exposes it with ngrok for M-Pesa callback testing

$ErrorActionPreference = "Stop"

Write-Host "=== TikTok App Development Server ===" -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "Please edit .env with your M-Pesa credentials." -ForegroundColor Yellow
}

# Check if ngrok is installed
$ngrokPath = Get-Command ngrok -ErrorAction SilentlyContinue
if (-not $ngrokPath) {
    Write-Host "ngrok not found. Installing globally..." -ForegroundColor Yellow
    npm install -g ngrok
}

Write-Host "Starting Express server on port 3000..." -ForegroundColor Green
$serverProcess = Start-Process npm -ArgumentList "start" -PassThru -NoNewWindow
Start-Sleep -Seconds 2

Write-Host "Starting ngrok tunnel on port 3000..." -ForegroundColor Green
$ngrokProcess = Start-Process ngrok -ArgumentList "http 3000" -PassThru

# Give ngrok time to start and retrieve the tunnel URL
Start-Sleep -Seconds 3

# Note: Ngrok URL detection on Windows is more complex; user should check ngrok web UI at http://127.0.0.1:4040
Write-Host ""
Write-Host "✓ Server running at http://localhost:3000" -ForegroundColor Green
Write-Host "✓ Ngrok tunnel started (check ngrok web UI at http://127.0.0.1:4040 for public URL)" -ForegroundColor Green
Write-Host "✓ Update .env MPESA_CALLBACK_URL with the ngrok https URL" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

# Keep the script running
$null = $serverProcess.WaitForExit()
