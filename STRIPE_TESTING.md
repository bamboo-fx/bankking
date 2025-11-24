# Stripe Integration Testing Guide

## ✅ Pre-Testing Checklist

- [x] Stripe environment variables configured in `.env.local`
- [x] Stripe CLI installed (`stripe --version`)
- [x] Dev server running (`npm run dev`)
- [ ] Stripe webhook listener running (see Step 1)

---

## 🧪 Step-by-Step Testing Guide

### Step 1: Start Stripe Webhook Listener

**Open a NEW terminal window** (keep dev server running in another terminal):

```bash
cd /Users/kevinxia/Downloads/bankking
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

**Expected output:**
```
> Ready! Your webhook signing secret is whsec_... (^C to quit)
```

**Important:** 
- Keep this terminal running during all tests
- If you restart it, update `STRIPE_WEBHOOK_SECRET` in `.env.local` with the new secret
- Restart your dev server after updating the secret

---

### Step 2: Test Authentication Flow

1. **Navigate to:** `http://localhost:3000`
2. **Click "Login"** or go to `/auth/login`
3. **Sign in with Google OAuth**
4. **Verify:** You're redirected and can see your account

**✅ Success Criteria:**
- Authentication works
- User profile is created in Supabase
- You can access `/account` page

---

### Step 3: Test Pricing Page

1. **Navigate to:** `http://localhost:3000/pricing`
2. **Verify:** You see two pricing plans:
   - Monthly: $10/month
   - Yearly: $100/year
3. **Check:** Both plans show "Get Started" buttons

**✅ Success Criteria:**
- Pricing page loads correctly
- Price IDs are configured (check browser console for errors)

---

### Step 4: Test Checkout Flow (Full Test)

#### 4a. Start Checkout

1. **Go to:** `http://localhost:3000/pricing`
2. **Click "Get Started"** on either plan
3. **Expected:** Redirected to Stripe Checkout page

**✅ Success Criteria:**
- No errors in browser console
- Redirected to Stripe hosted checkout page
- URL should be `checkout.stripe.com/...`

#### 4b. Complete Test Payment

**Use Stripe Test Card:**
- **Card Number:** `4242 4242 4242 4242`
- **Expiry:** Any future date (e.g., `12/34`)
- **CVC:** Any 3 digits (e.g., `123`)
- **ZIP:** Any 5 digits (e.g., `12345`)

**Steps:**
1. Fill in test card details
2. Click "Subscribe" or "Pay"
3. **Expected:** Redirected back to `/account?success=true`

**✅ Success Criteria:**
- Payment completes successfully
- Redirected to account page
- Success message appears
- Subscription status shows "Active"

#### 4c. Verify Webhook Processing

**Check the Stripe CLI terminal:**
- You should see webhook events being received:
  ```
  2024-11-23 15:30:45  --> checkout.session.completed [evt_xxx]
  2024-11-23 15:30:46  <-- [200] POST http://localhost:3000/api/stripe/webhook [evt_xxx]
  ```

**Check Supabase Database:**
1. Go to Supabase Dashboard → Table Editor → `profiles`
2. Find your user's profile
3. **Verify these fields are updated:**
   - `stripe_customer_id` - Should have a value (starts with `cus_`)
   - `stripe_subscription_id` - Should have a value (starts with `sub_`)
   - `subscription_status` - Should be `"active"`
   - `subscription_tier` - Should be `"monthly"` or `"yearly"`

**✅ Success Criteria:**
- Webhook events are received
- Database is updated correctly
- No errors in Stripe CLI terminal

---

### Step 5: Test Account Page

1. **Navigate to:** `http://localhost:3000/account`
2. **Verify:**
   - Profile information displays correctly
   - Subscription status shows "Active" badge (green)
   - Plan shows correct tier (Monthly/Yearly)
   - "Manage Subscription" button is visible

**✅ Success Criteria:**
- Account page displays subscription info
- Status badge is correct

---

### Step 6: Test Customer Portal

1. **On account page**, click **"Manage Subscription"**
2. **Expected:** Redirected to Stripe Customer Portal
3. **In the portal, you can:**
   - View subscription details
   - Update payment method
   - Cancel subscription (for testing)
   - View invoices

**✅ Success Criteria:**
- Portal opens successfully
- Can see subscription details
- Can navigate portal features

---

### Step 7: Test Subscription Guard

1. **If you canceled subscription in Step 6:**
   - Try to access a module: `http://localhost:3000/module/[id]`
   - **Expected:** See "Subscription Required" page
   - **Verify:** Lock icon and upgrade prompt appear

2. **If subscription is active:**
   - Access a module
   - **Expected:** Module content loads normally

**✅ Success Criteria:**
- Guard blocks access when subscription is inactive
- Guard allows access when subscription is active

---

### Step 8: Test Webhook Events (Advanced)

#### Test Subscription Update

1. **In Stripe Dashboard:**
   - Go to Customers → Find your test customer
   - Go to Subscriptions → Click on subscription
   - Manually trigger events or wait for natural events

2. **Watch Stripe CLI terminal:**
   - Should see `customer.subscription.updated` events
   - Check that webhook handler processes them

#### Test Subscription Cancellation

1. **Cancel subscription** via Customer Portal (Step 6)
2. **Watch Stripe CLI terminal:**
   - Should see `customer.subscription.deleted` event
3. **Check Supabase:**
   - `subscription_status` should be `"canceled"`
   - `subscription_tier` should be `null`
   - `stripe_subscription_id` should be `null`

**✅ Success Criteria:**
- All webhook events are processed
- Database stays in sync with Stripe

---

## 🐛 Troubleshooting

### Issue: "Cannot find module" errors
**Solution:** Make sure all dependencies are installed:
```bash
npm install
```

### Issue: Webhook not receiving events
**Check:**
1. Stripe CLI is running (`stripe listen`)
2. `STRIPE_WEBHOOK_SECRET` matches the secret from CLI
3. Dev server was restarted after updating `.env.local`

### Issue: "Unauthorized" error on checkout
**Check:**
1. User is logged in
2. Supabase authentication is working
3. Check browser console for errors

### Issue: Payment succeeds but database not updated
**Check:**
1. Webhook listener is running
2. Webhook secret is correct
3. Check Stripe CLI terminal for errors
4. Check Supabase logs for errors
5. Verify `SUPABASE_SERVICE_ROLE_KEY` is set (needed for webhooks)

### Issue: Customer Portal not opening
**Check:**
1. User has `stripe_customer_id` in database
2. `STRIPE_SECRET_KEY` is correct
3. Check browser console for errors

---

## 📋 Test Scenarios Checklist

- [ ] **Happy Path:** Sign up → Subscribe → Access content
- [ ] **Cancel Flow:** Subscribe → Cancel → Verify access blocked
- [ ] **Re-subscribe:** Cancel → Subscribe again → Verify access restored
- [ ] **Payment Failure:** Use declined card (`4000 0000 0000 0002`)
- [ ] **Past Due:** Simulate past due payment (via Stripe Dashboard)
- [ ] **Multiple Subscriptions:** Try subscribing twice (should handle gracefully)

---

## 🎯 Production Readiness Checklist

Before going live:

- [ ] Switch to **Live Mode** in Stripe Dashboard
- [ ] Update environment variables with **live keys**:
  - `STRIPE_SECRET_KEY` → `sk_live_...`
  - Get webhook secret from production webhook endpoint
- [ ] Create **production webhook endpoint** in Stripe Dashboard
- [ ] Update `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Test with real payment method (small amount)
- [ ] Verify webhooks work in production
- [ ] Set up monitoring/alerts for webhook failures
- [ ] Test subscription cancellation flow
- [ ] Test payment failure handling

---

## 📚 Useful Stripe Test Cards

| Card Number | Scenario |
|------------|----------|
| `4242 4242 4242 4242` | Success |
| `4000 0000 0000 0002` | Card declined |
| `4000 0000 0000 9995` | Insufficient funds |
| `4000 0025 0000 3155` | Requires authentication (3D Secure) |

---

## 🔗 Quick Links

- **Stripe Dashboard:** https://dashboard.stripe.com/test
- **Stripe Test Cards:** https://stripe.com/docs/testing
- **Stripe Webhooks Guide:** https://stripe.com/docs/webhooks
- **Stripe Customer Portal:** https://stripe.com/docs/billing/subscriptions/integrating-customer-portal

---

## ✅ Final Verification

After completing all tests, verify:

1. ✅ Checkout flow works end-to-end
2. ✅ Webhooks are received and processed
3. ✅ Database stays in sync with Stripe
4. ✅ Customer portal is accessible
5. ✅ Subscription guard protects content
6. ✅ Account page displays correct status
7. ✅ All error cases are handled gracefully

**If all checks pass, Stripe integration is fully functional! 🎉**

