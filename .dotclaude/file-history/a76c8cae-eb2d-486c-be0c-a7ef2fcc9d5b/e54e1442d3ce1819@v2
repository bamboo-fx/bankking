# Database Setup Instructions

## Run this SQL in your Supabase SQL Editor

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the contents of `/supabase/migrations/001_create_profiles.sql`
5. Click **Run** to execute the migration

This will create:
- `profiles` table to store user data
- Row Level Security (RLS) policies for data protection
- Triggers to automatically create profiles when users sign up
- Automatic timestamp updates

## Configure Google OAuth

1. Go to **Authentication** → **Providers** in your Supabase dashboard
2. Enable **Google** provider
3. Add your Google OAuth credentials:
   - Client ID
   - Client Secret
4. Set the redirect URL to: `https://your-project-ref.supabase.co/auth/v1/callback`
5. Add authorized redirect URIs in Google Cloud Console:
   - `http://localhost:3000/auth/callback` (for development)
   - `https://your-domain.com/auth/callback` (for production)

## Get your Supabase credentials

1. Go to **Project Settings** → **API** in your Supabase dashboard
2. Copy:
   - Project URL (`NEXT_PUBLIC_SUPABASE_URL`)
   - anon/public key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
3. Add these to your `.env.local` file
