# Production Deployment Guide - Vercel

## 🚀 Quick Deploy (Recommended)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for production"
   git push origin main
   ```

2. **Go to Vercel:**
   - Visit: https://vercel.com/new
   - Click "Import Project"
   - Connect your GitHub account
   - Select your repository (`bankking`)
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - Click "Deploy"

4. **Add Environment Variables** (see Step 2 below)

5. **Redeploy** after adding environment variables

---

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow prompts (use defaults for most)
   - For production: `vercel --prod`

---

## 🔐 Step 2: Configure Environment Variables in Vercel

### In Vercel Dashboard:

1. Go to your project → **Settings** → **Environment Variables**
2. Add each variable below (use **Production**, **Preview**, and **Development**)

### Required Environment Variables:

```bash
# Supabase (use same values from .env.local)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe - PRODUCTION KEYS (switch from test to live!)
STRIPE_SECRET_KEY=sk_live_...  # ⚠️ Use LIVE key, not test!
STRIPE_WEBHOOK_SECRET=whsec_...  # From production webhook (see Step 3)
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_...  # Production price ID
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=price_...  # Production price ID

# Site URL - YOUR PRODUCTION DOMAIN
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
# Or your custom domain: https://yourdomain.com
```

### ⚠️ Important Notes:

- **Stripe Keys:** Switch from `sk_test_...` to `sk_live_...` in production
- **Price IDs:** Create production prices in Stripe Dashboard (Live Mode)
- **Webhook Secret:** Get from production webhook endpoint (Step 3)
- **Site URL:** Update after first deployment to get your Vercel URL

---

## 🔔 Step 3: Set Up Production Stripe Webhook

### 3a. Get Your Production URL

After first deployment, Vercel will give you a URL like:
- `https://your-app.vercel.app`

### 3b. Create Production Webhook in Stripe

1. **Go to Stripe Dashboard:**
   - Switch to **Live Mode** (toggle in top right)
   - Go to **Developers** → **Webhooks**
   - Click **Add endpoint**

2. **Configure Webhook:**
   - **Endpoint URL:** `https://your-app.vercel.app/api/stripe/webhook`
   - **Description:** "Production webhook"
   - **Events to send:**
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Click **Add endpoint**

3. **Copy Webhook Signing Secret:**
   - Click on the webhook you just created
   - Click **Reveal** next to "Signing secret"
   - Copy the `whsec_...` value
   - Add to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`

4. **Update Environment Variable in Vercel:**
   - Go to Vercel → Settings → Environment Variables
   - Update `STRIPE_WEBHOOK_SECRET` with production secret
   - Redeploy

---

## 🎫 Step 4: Create Production Stripe Products & Prices

### Switch to Live Mode in Stripe:

1. **Go to Stripe Dashboard**
2. **Toggle to Live Mode** (top right)
3. **Create Products:**
   - Products → Add product
   - Create Monthly and Yearly subscriptions
   - Copy the **Price IDs** (starts with `price_`)
   - Update in Vercel environment variables

### Update Environment Variables:

```bash
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_...  # Live mode price ID
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=price_...  # Live mode price ID
```

---

## 🔄 Step 5: Update Supabase Redirect URLs

### 5a. Update Supabase Auth Redirect URLs

1. **Go to Supabase Dashboard:**
   - Authentication → URL Configuration
   - Add to **Redirect URLs:**
     - `https://your-app.vercel.app/auth/callback`
     - `https://yourdomain.com/auth/callback` (if using custom domain)

2. **Update Google OAuth (if using):**
   - Go to Google Cloud Console
   - Update authorized redirect URIs:
     - `https://your-app.vercel.app/auth/callback`
     - `https://yourdomain.com/auth/callback`

---

## ✅ Step 6: Verify Deployment

### 6a. Check Build Logs

1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Click on latest deployment
3. Check **Build Logs** for errors

### 6b. Test Production Site

1. **Visit your production URL:**
   - `https://your-app.vercel.app`

2. **Test Authentication:**
   - Try logging in
   - Verify redirect works

3. **Test Stripe Checkout:**
   - Go to `/pricing`
   - Click "Get Started"
   - Use a **real test card** (Stripe test mode still works with live keys for testing)
   - Or use a real card with small amount

4. **Verify Webhooks:**
   - Go to Stripe Dashboard → Webhooks
   - Click on your production webhook
   - Check "Recent events" - should show successful deliveries

---

## 🧪 Step 7: Production Testing Checklist

- [ ] Site loads correctly
- [ ] Authentication works (login/logout)
- [ ] Pricing page displays correctly
- [ ] Checkout flow works
- [ ] Payment processing works
- [ ] Webhook receives events (check Stripe Dashboard)
- [ ] Database updates after payment (check Supabase)
- [ ] Customer portal opens
- [ ] Subscription guard works
- [ ] Account page shows correct status

---

## 🔧 Troubleshooting

### Issue: Build fails on Vercel

**Check:**
1. Build logs in Vercel dashboard
2. All environment variables are set
3. Node version compatibility (Vercel auto-detects, but check if needed)

**Solution:**
- Add `engines` to `package.json`:
  ```json
  "engines": {
    "node": ">=18.0.0"
  }
  ```

### Issue: Environment variables not working

**Check:**
1. Variables are set for correct environment (Production/Preview/Development)
2. Variable names match exactly (case-sensitive)
3. No extra spaces or quotes
4. Redeploy after adding variables

### Issue: Webhook not receiving events

**Check:**
1. Webhook URL is correct in Stripe Dashboard
2. `STRIPE_WEBHOOK_SECRET` matches the signing secret
3. Webhook is in Live Mode (if using live keys)
4. Check webhook logs in Stripe Dashboard

### Issue: "Invalid API Key" errors

**Check:**
1. Using correct key type:
   - `sk_live_...` for production
   - `sk_test_...` for testing
2. Key matches the Stripe mode (Live/Test)
3. No extra characters or spaces

---

## 🌐 Custom Domain Setup (Optional)

1. **In Vercel Dashboard:**
   - Go to Settings → Domains
   - Add your domain
   - Follow DNS configuration instructions

2. **Update Environment Variables:**
   - Update `NEXT_PUBLIC_SITE_URL` to your custom domain
   - Update Supabase redirect URLs
   - Update Stripe webhook URL
   - Redeploy

---

## 📊 Monitoring & Analytics

### Vercel Analytics:
- Automatically enabled on Vercel
- View in Dashboard → Analytics

### Stripe Dashboard:
- Monitor payments, subscriptions, webhooks
- Set up email alerts for failed webhooks

### Supabase:
- Monitor database usage
- Check authentication logs

---

## 🔄 Continuous Deployment

Once set up, Vercel will automatically deploy when you push to your main branch:

```bash
git add .
git commit -m "Update feature"
git push origin main
# Vercel automatically deploys!
```

---

## 🎯 Production Checklist Summary

Before going live, ensure:

- [ ] All environment variables set in Vercel
- [ ] Using **Live Mode** Stripe keys (`sk_live_...`)
- [ ] Production Stripe prices created
- [ ] Production webhook configured
- [ ] Supabase redirect URLs updated
- [ ] `NEXT_PUBLIC_SITE_URL` set to production domain
- [ ] Tested full checkout flow
- [ ] Webhooks receiving events
- [ ] Database syncing correctly
- [ ] Custom domain configured (if using)

---

## 🚨 Security Reminders

1. **Never commit `.env.local`** to Git
2. **Use Vercel environment variables** for all secrets
3. **Rotate keys** if accidentally exposed
4. **Enable 2FA** on Vercel, Stripe, and Supabase accounts
5. **Review webhook security** - verify signatures are checked

---

## 📚 Useful Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Stripe Dashboard (Live):** https://dashboard.stripe.com
- **Supabase Dashboard:** https://app.supabase.com
- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment

---

## ✅ Ready to Deploy!

Your app is ready for production. Follow the steps above and you'll be live in minutes! 🚀





