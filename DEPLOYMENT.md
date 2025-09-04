# Vercel Deployment Guide

This guide will help you deploy your Pyramid HR application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. A PostgreSQL database (recommended: [Neon](https://neon.tech) or [Supabase](https://supabase.com))
3. Email service credentials (Gmail SMTP or similar)

## Step 1: Database Setup

### Option A: Neon (Recommended)

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string (it will look like: `postgresql://username:password@host:port/database`)
4. Save this as `DATABASE_URL` for later

### Option B: Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string
5. Save this as `DATABASE_URL` for later

## Step 2: Email Service Setup

### Gmail SMTP (Recommended)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate a new app password for "Mail"
3. Note down your Gmail address and the app password

## Step 3: Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**

   ```bash
   vercel login
   ```

3. **Deploy from your project directory:**

   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? `Y`
   - Which scope? (select your account)
   - Link to existing project? `N`
   - Project name: `pyramid-hr` (or your preferred name)
   - Directory: `.` (current directory)
   - Override settings? `N`

### Method 2: GitHub Integration

1. **Push your code to GitHub:**

   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure the project settings

## Step 4: Environment Variables

In your Vercel dashboard, go to your project settings and add these environment variables:

### Required Variables:

```
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
```

### Email Configuration (choose one set):

```
# Option 1: SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=your-email@gmail.com
TO_EMAIL=hello@talentpro.com

# Option 2: Alternative Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Step 5: Database Migration

After deployment, you need to run the database migration:

1. **Install Drizzle CLI globally:**

   ```bash
   npm install -g drizzle-kit
   ```

2. **Run the migration:**

   ```bash
   DATABASE_URL=your_database_url npm run db:push
   ```

   Or set the DATABASE_URL in your local environment and run:

   ```bash
   npm run db:push
   ```

## Step 6: Test Your Deployment

1. Visit your Vercel URL (provided after deployment)
2. Test the contact form to ensure:
   - Form submission works
   - Email notifications are sent
   - Data is stored in the database

## Troubleshooting

### Common Issues:

1. **Build Errors:**

   - Check that all dependencies are in `dependencies` not `devDependencies`
   - Ensure TypeScript compilation passes: `npm run check`

2. **Database Connection Issues:**

   - Verify your `DATABASE_URL` is correct
   - Ensure your database allows connections from Vercel's IP ranges
   - Check if SSL is required (add `?sslmode=require` to your DATABASE_URL)

3. **Email Issues:**

   - Verify SMTP credentials are correct
   - Check if 2FA is enabled and app password is used
   - Ensure FROM_EMAIL and TO_EMAIL are set correctly

4. **Static Files Not Loading:**
   - Check that the build output directory is correct in `vercel.json`
   - Ensure the client build is working: `npm run build:client`

### Vercel Configuration:

The `vercel.json` file is already configured for your project structure. It:

- Builds both the client and server
- Routes API calls to the server
- Serves static files from the client build
- Sets appropriate timeouts for serverless functions

## Monitoring

After deployment, you can monitor your application:

- **Vercel Dashboard:** View deployment logs and performance
- **Function Logs:** Check server-side logs in Vercel dashboard
- **Database:** Monitor database performance in your database provider's dashboard

## Custom Domain (Optional)

To use a custom domain:

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your domain
4. Follow the DNS configuration instructions

## Support

If you encounter issues:

1. Check the Vercel deployment logs
2. Verify all environment variables are set correctly
3. Test the application locally with production environment variables
4. Check the database connection and email configuration

Your Pyramid HR application should now be successfully deployed on Vercel! 🚀
