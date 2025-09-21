# Vercel Environment Variables Setup

To fix the images not showing on Vercel, you need to set the following environment variables in your Vercel project:

## Required Environment Variables

1. Go to your Vercel dashboard
2. Navigate to your project
3. Go to Settings → Environment Variables
4. Add the following variables:

```
VITE_SUPABASE_URL=https://cidmjjbfdvkifxhdjvvm.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZG1qamJmZHZraWZ4aGRqdnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyMTkxMjIsImV4cCI6MjA3MTc5NTEyMn0.Bs2CE9VeDNAsmnoBox5nc_096hGlorvvUL05RVLJgWI
VITE_SUPABASE_BUCKET=angies-plug
```

## Important Notes

- Make sure to set these for **both** Preview and Production environments
- After adding the variables, **redeploy** your project
- The variables must start with `VITE_` to be accessible in the frontend

## Verification

After setting the variables and redeploying:
1. Check the browser console for any Supabase connection errors
2. Try uploading an image through the admin panel
3. Verify the image appears on the website

## Troubleshooting

If images still don't show:
1. Check the browser console for errors
2. Verify the environment variables are set correctly
3. Make sure the Supabase project is active and accessible
4. Check that the database tables exist and have the correct structure
