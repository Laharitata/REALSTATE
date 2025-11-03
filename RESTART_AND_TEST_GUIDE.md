# Server Restart and Testing Guide

## Step 1: Stop the Current Server

You need to stop the currently running backend server to apply the changes.

### How to Stop:
1. Find the terminal window where the backend server is running
2. Press `Ctrl + C` to stop the server
3. Wait for the process to terminate

---

## Step 2: Restart the Backend Server

After stopping, restart the server with the updated code:

```bash
cd la-project/backend
node server.js
```

**Expected Output:**
```
MongoDB connected
Server running on port 5000
```

---

## Step 3: Run Automated Tests

Open a **NEW terminal window** (keep the server running in the first one) and run:

```bash
cd la-project/backend
node testAllSubmissions.js
```

**Expected Results:**
- ✅ All 9 tests should pass
- Success rate: 100%

---

## Step 4: Manual Frontend Testing

After automated tests pass, test the frontend:

### 4.1 Start Frontend (if not running)
```bash
cd la-project/frontend
npm run dev
```

### 4.2 Test Each Form

#### Test 1: Signup
1. Go to http://localhost:5174/signup
2. Fill in all fields
3. Click "Sign Up"
4. **Expected:** Success message, user created

#### Test 2: Login
1. Go to http://localhost:5174/login
2. Enter credentials
3. Click "Login"
4. **Expected:** Successful login, redirected to home

#### Test 3: Sell Property
1. Login first
2. Go to "Sell" page
3. Fill in property details
4. Upload images
5. Click "Submit"
6. **Expected:** "Property listed successfully!" alert

#### Test 4: Contact Seller
1. Login first
2. Go to "Buy" page
3. Click "Buy" on any property
4. Click "Contact Seller" tab
5. Enter message
6. Click "Send Message"
7. **Expected:** Success message, modal closes

#### Test 5: Book Appointment
1. Login first
2. Go to "Buy" page
3. Click "Buy" on any property
4. Click "Book Viewing" tab
5. Select date, time, type
6. Click "Schedule Viewing"
7. **Expected:** Success message, modal closes

#### Test 6: Make Offer
1. Login first
2. Go to "Buy" page
3. Click "Buy" on any property
4. Click "Make Offer" tab
5. Enter offer amount
6. Click "Submit Offer"
7. **Expected:** Success message, modal closes

#### Test 7: Profile
1. Login first
2. Go to "Profile" page
3. **Expected:** User data displayed correctly

#### Test 8: Wishlist
1. Login first
2. Go to "Buy" page
3. Click heart icon on a property
4. Go to "Wishlist" page
5. **Expected:** Property appears in wishlist

---

## Troubleshooting

### If tests still fail:
1. Make sure MongoDB is running
2. Check if port 5000 is free
3. Verify .env file has correct MONGO_URI
4. Check console for error messages

### If frontend forms don't work:
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab to see API calls
4. Verify API_URL in frontend .env

---

## Success Criteria

✅ All automated tests pass (9/9)
✅ Signup form works
✅ Login form works
✅ Sell property form works
✅ Contact seller works
✅ Appointment booking works
✅ Offer submission works
✅ Profile loads correctly
✅ Wishlist functions properly

---

**Ready to start? Follow Step 1 above!**
