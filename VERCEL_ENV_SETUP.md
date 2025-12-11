# Vercel Environment Variables Setup

## Required Environment Variables

Make sure these are set in your Vercel project settings:

### 1. MONGODB_URI
```
mongodb+srv://yrajeshkumar799:3S2JRJQPog4EGsOA@cluster0.rp5sr.mongodb.net/TaskK
```

### 2. NEXTAUTH_SECRET
```
ydfji34r98349jtf34rj3i4jrf34snfisiufsfsf
```

### 3. NEXTAUTH_URL (CRITICAL!)
**Important:** This must match your actual Vercel deployment URL exactly.

Format: `https://your-app-name.vercel.app`

Example:
```
https://house-of-edtech-assignment.vercel.app
```

**Steps to set:**
1. After first deployment, copy your Vercel URL
2. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
3. Add/Update `NEXTAUTH_URL` with your actual URL (include https://)
4. Make sure there's NO trailing slash
5. Click "Save"
6. Go to Deployments → Click "..." → "Redeploy"

### 4. OPENAI_API_KEY (Optional)
```
sk-proj-... (your OpenAI key)
```
*App has fallbacks if not provided*

### 5. NODE_ENV
```
production
```

## Common Issues

### Issue: Not redirecting after login on Vercel
**Solution:**
1. Verify `NEXTAUTH_URL` matches your Vercel domain EXACTLY
2. No trailing slash in URL
3. Must include `https://`
4. Redeploy after changing environment variables

### Issue: NextAuth session not persisting
**Solution:**
- Check if `NEXTAUTH_SECRET` is set (must be 32+ characters)
- Verify cookies are not being blocked
- Check browser console for errors

### Issue: MongoDB connection timeout
**Solution:**
- MongoDB Atlas → Network Access → Add `0.0.0.0/0`
- Verify connection string has correct username/password

## Verification Steps

After deployment with correct environment variables:

1. Visit your live URL
2. Try to register a new account
3. Should redirect to dashboard immediately
4. Logout and login again
5. Should redirect to dashboard immediately

If redirects don't work:
- Check browser console for errors
- Verify `NEXTAUTH_URL` in Vercel settings
- Try clearing cookies and testing again
- Check Vercel function logs for errors

## Quick Fix Commands

If you need to update environment variables:

```bash
# Method 1: Via Vercel Dashboard
1. Go to project settings
2. Environment Variables tab
3. Edit the variable
4. Redeploy

# Method 2: Via Vercel CLI (if installed)
vercel env add NEXTAUTH_URL production
# Enter your URL when prompted
vercel --prod
```

## Production Checklist

- [ ] NEXTAUTH_URL set to actual Vercel domain
- [ ] NEXTAUTH_SECRET is strong (32+ chars)
- [ ] MONGODB_URI points to production database
- [ ] MongoDB Atlas has IP whitelist configured
- [ ] All environment variables saved
- [ ] Project redeployed after env var changes
- [ ] Login/Register tested on live site
- [ ] Dashboard redirect works
