Set-Location "c:\Users\live\Downloads\EVENT Ticket pro\frontend"
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   CLOUDFLARE PAGES ONE-CLICK DEPLOYMENT" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Step 1: Logging in to Cloudflare..." -ForegroundColor Yellow
Write-Host "A browser tab will open in Chrome. Please click 'Allow' to approve." -ForegroundColor Yellow
Write-Host ""

.\node_modules\.bin\wrangler.cmd login

if ($LASTEXITCODE -ne 0) {
    Write-Host "Login was not completed. Please run again." -ForegroundColor Red
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

Write-Host ""
Write-Host "Step 2: Deploying web app to Cloudflare Pages..." -ForegroundColor Green
Write-Host ""

.\node_modules\.bin\wrangler.cmd pages deploy dist --project-name=event-ticket-platform

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Deployment complete! Your web app is live on Cloudflare." -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to close this window..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
