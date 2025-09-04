#!/bin/bash

# Pyramid HR - Vercel Deployment Script
echo "🚀 Starting Pyramid HR deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Please install it first:"
    echo "npm install -g vercel"
    exit 1
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel first:"
    echo "vercel login"
    exit 1
fi

# Build the project locally to check for errors
echo "🔨 Building project locally..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors before deploying."
    exit 1
fi

echo "✅ Build successful!"

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Set up your environment variables in the Vercel dashboard"
    echo "2. Set up your PostgreSQL database (Neon or Supabase recommended)"
    echo "3. Run database migration: npm run db:push"
    echo "4. Test your deployed application"
    echo ""
    echo "📖 For detailed instructions, see DEPLOYMENT.md"
else
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi
