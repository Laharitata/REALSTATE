# Troubleshooting Guide - Contact Seller Feature

## Issue: "Buy" Button Not Working / Failed to Fetch Error

### Quick Fixes to Try:

#### 1. **Hard Refresh the Browser**
- Press `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
- This clears the cache and reloads all files

#### 2. **Restart the Frontend Server**
- Stop the frontend server (Ctrl + C in the terminal)
- Run: `cd la-project/frontend && npm run dev`
- Wait for "ready in XXXms" message
- Open http://localhost:5173 in a fresh browser tab

#### 3. **Check Backend Server**
- Verify backend is running on port 5000
- You should see:
  ```
  Server running on port 5000
  MongoDB connected
  ```
- If not running, restart: `cd la-project/backend && npm run dev`

#### 4. **Clear Browser Storage**
- Open Developer Tools (F12)
- Go to Application tab (Chrome) or Storage tab (Firefox)
- Click "Clear site data" or manually clear:
  - Local Storage
  - Session Storage
  - Cookies
- Refresh the page

#### 5. **Check for JavaScript Errors**
- Open Developer Tools (F12)
- Go to Console tab
- Look for any red error messages
- Common errors and solutions:
  - **"Cannot read property of undefined"** → Refresh the page
  - **"Network Error"** → Check if backend is running
  - **"401 Unauthorized"** → Login again
  - **"404 Not Found"** → Check API endpoints

#### 6. **Verify File Changes Were Saved**
- Check if `ContactSellerForm.jsx` has the updated code
- Look for these lines at the top:
  ```javascript
  import axios from "axios";
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  ```
- If not present, the file wasn't saved correctly

---

## Step-by-Step Testing Process:

### Test 1: Backend API (Using Browser)
1. Open a new browser tab
2. Go to: `http://localhost:5000/api/properties`
3. **Expected:** You should see JSON data with properties
4. **If you see an error:** Backend is not running or has issues

### Test 2: Login
1. Go to: http://localhost:5173
2. Login with:
   - Username: `testuser`
   - Password: `testpass`
3. **Expected:** Redirected to Buy page
4. **If login fails:** Check console for errors

### Test 3: Properties Display
1. After login, you should see properties listed
2. Each property should have a "Buy" button
3. **If no properties:** Check if backend is connected to MongoDB

### Test 4: Buy Button
1. Click any "Buy" button
2. **Expected:** Modal popup appears
3. **If nothing happens:**
   - Open Console (F12)
   - Click Buy button again
   - Check for error messages

### Test 5: Contact Form
1. Modal should show:
   - Property details
   - Your name (pre-filled)
   - Your email (pre-filled)
   - Your phone (pre-filled)
   - Message field
2. **If fields are empty:** Profile data not loading

### Test 6: Submit Request
1. Click "Submit Request"
2. **Expected:** Success message appears
3. **Expected:** Modal closes
4. **Expected:** "Buy" button changes to "Show Contact"

---

## Common Issues and Solutions:

### Issue: "Failed to fetch" Error

**Cause:** Frontend can't connect to backend

**Solutions:**
1. Check if backend is running on port 5000
2. Check if CORS is enabled in backend
3. Verify API_URL in frontend code
4. Check browser console for exact error

### Issue: Buy Button Does Nothing

**Cause:** JavaScript error or event handler not attached

**Solutions:**
1. Hard refresh browser (Ctrl + Shift + R)
2. Check console for errors
3. Verify PropertyCard.jsx has the handleBuy function
4. Restart frontend server

### Issue: Modal Opens But Fields Are Empty

**Cause:** Profile endpoint not accessible

**Solutions:**
1. Verify you're logged in (check localStorage for token)
2. Check if `/profile` endpoint exists in backend
3. Verify ContactSellerForm is using correct API URL
4. Check network tab for failed requests

### Issue: Submit Button Doesn't Work

**Cause:** API endpoint issue or authentication problem

**Solutions:**
1. Check if token is valid (not expired)
2. Verify `/api/contact-requests` endpoint exists
3. Check backend logs for errors
4. Verify request payload is correct

---

## Debug Checklist:

- [ ] Backend server is running (port 5000)
- [ ] Frontend server is running (port 5173)
- [ ] MongoDB is connected
- [ ] Browser cache is cleared
- [ ] No JavaScript errors in console
- [ ] Token exists in localStorage
- [ ] API endpoints are accessible
- [ ] CORS is enabled in backend
- [ ] All files are saved with latest changes

---

## Still Having Issues?

If none of the above solutions work, please provide:

1. **Exact error message** from browser console
2. **Network tab** screenshot showing failed requests
3. **Backend terminal** output
4. **Frontend terminal** output
5. **Steps to reproduce** the issue

This will help identify the exact problem and provide a targeted solution.
