# Project Reorganization Script
# This script reorganizes the project to separate frontend and backend files

Write-Host "🔧 Starting Project Reorganization..." -ForegroundColor Cyan
Write-Host ""

# Check if dev server is running
Write-Host "⚠️  IMPORTANT: Make sure to stop the dev server (npm run dev) before running this script!" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to cancel, or any other key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host ""
Write-Host "📁 Creating backend directory structure..." -ForegroundColor Green

# Create backend directories (already created, but ensure they exist)
New-Item -ItemType Directory -Force -Path "backend\api" | Out-Null
New-Item -ItemType Directory -Force -Path "backend\actions" | Out-Null
New-Item -ItemType Directory -Force -Path "backend\database" | Out-Null
New-Item -ItemType Directory -Force -Path "backend\lib" | Out-Null
New-Item -ItemType Directory -Force -Path "components" | Out-Null

Write-Host "✅ Backend directories created" -ForegroundColor Green

# Move API routes from app/api to backend/api
Write-Host ""
Write-Host "📦 Moving API routes to backend..." -ForegroundColor Green
if (Test-Path "app\api") {
    Get-ChildItem -Path "app\api" | ForEach-Object {
        Move-Item -Path $_.FullName -Destination "backend\api\" -Force
        Write-Host "  ✓ Moved $($_.Name)" -ForegroundColor Gray
    }
    Remove-Item -Path "app\api" -Force
    Write-Host "✅ API routes moved to backend\api\" -ForegroundColor Green
} else {
    Write-Host "⚠️  app\api not found (may already be moved)" -ForegroundColor Yellow
}

# Note: actions, scripts, and schema already moved
Write-Host ""
Write-Host "✅ Server actions already in backend\actions\" -ForegroundColor Green
Write-Host "✅ Database scripts already in backend\database\" -ForegroundColor Green
Write-Host "✅ Backend libraries already in backend\lib\" -ForegroundColor Green

# Clean up empty directories
Write-Host ""
Write-Host "🧹 Cleaning up empty directories..." -ForegroundColor Green
if (Test-Path "app\actions") {
    Remove-Item -Path "app\actions" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "scripts") {
    Remove-Item -Path "scripts" -Force -ErrorAction SilentlyContinue
}

Write-Host ""
Write-Host "✨ Reorganization Complete!" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Summary:" -ForegroundColor Cyan
Write-Host "  • Frontend pages: app\" -ForegroundColor White
Write-Host "  • Backend API: backend\api\" -ForegroundColor White
Write-Host "  • Server actions: backend\actions\" -ForegroundColor White
Write-Host "  • Database: backend\database\" -ForegroundColor White
Write-Host "  • Backend utilities: backend\lib\" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  IMPORTANT: You need to update import paths!" -ForegroundColor Yellow
Write-Host "  See UPDATE_IMPORTS.md for details" -ForegroundColor Yellow
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Review the changes" -ForegroundColor White
Write-Host "  2. Update import paths (see UPDATE_IMPORTS.md)" -ForegroundColor White
Write-Host "  3. Test the application: npm run dev" -ForegroundColor White
Write-Host ""
