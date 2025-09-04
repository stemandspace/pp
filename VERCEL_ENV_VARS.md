# Vercel Environment Variables

Copy and paste these environment variables into your Vercel project settings:

## Required Variables

```
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
```

## Email Configuration (Choose One Set)

### Option 1: SMTP Configuration

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=your-email@gmail.com
TO_EMAIL=hello@talentpro.com
```

### Option 2: Alternative Email Configuration

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click on "Settings" tab
3. Click on "Environment Variables" in the sidebar
4. Add each variable with its value
5. Make sure to select "Production" environment for all variables
6. Click "Save"

## Database Setup

For the `DATABASE_URL`, you can use:

- **Neon** (Recommended): https://neon.tech
- **Supabase**: https://supabase.com
- **Vercel Postgres**: Available in Vercel dashboard
- **Railway**: https://railway.app
- **PlanetScale**: https://planetscale.com

## Email Service Setup

For Gmail SMTP:

1. Enable 2-factor authentication
2. Generate an App Password
3. Use your Gmail address and the app password

For other email services, adjust the SMTP_HOST and SMTP_PORT accordingly.
