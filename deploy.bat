@echo off
REM Pyramid HR - Vercel Deployment Script for Windows
echo 🚀 Starting Pyramid HR deployment to Vercel...

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI is not installed. Please install it first:
    echo npm install -g vercel
    pause
    exit /b 1
)

REM Check if user is logged in to Vercel
vercel whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo 🔐 Please log in to Vercel first:
    echo vercel login
    pause
    exit /b 1
)

REM Build the project locally to check for errors
echo 🔨 Building project locally...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed. Please fix the errors before deploying.
    pause
    exit /b 1
)

echo ✅ Build successful!

REM Deploy to Vercel
echo 🚀 Deploying to Vercel...
call vercel --prod

if %errorlevel% eq 0 (
    echo ✅ Deployment successful!
    echo.
    echo 📋 Next steps:
    echo 1. Set up your environment variables in the Vercel dashboard
    echo 2. Set up your PostgreSQL database (Neon or Supabase recommended)
    echo 3. Run database migration: npm run db:push
    echo 4. Test your deployed application
    echo.
    echo 📖 For detailed instructions, see DEPLOYMENT.md
) else (
    echo ❌ Deployment failed. Please check the error messages above.
)

pause
