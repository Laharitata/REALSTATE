# Manual Frontend Testing Guide - Critical Path

## 🎯 Critical Path Testing Instructions

Follow these steps to test the Contact Seller feature's main functionality.

---

## Prerequisites

✅ Backend server running at: http://localhost:5000  
✅ Frontend server running at: http://localhost:5173  
✅ Test user credentials:
- **Username:** `testuser`
- **Password:** `testpass`

---

## 🧪 Test Steps

### Step 1: Open Application
1. Open your web browser
2. Navigate to: **http://localhost:5173**
3. **Expected:** Application loads successfully

**✅ Pass Criteria:** Homepage/Login page displays without errors

---

### Step 2: Login
1. Enter username: `testuser`
2. Enter password: `testpass`
3. Click "Login" button
4. **Expected:** 
   - Login successful message appears
   - Redirected to Buy page or dashboard
   - Navigation bar shows user is logged in

**✅ Pass Criteria:** Successfully logged in and redirected

---

### Step 3: Navigate to Buy Page
1. Click on "Buy" in the navigation menu
2. **Expected:**
   - Buy page loads
   - Property cards are displayed
   - Each card shows property details (image, title, price, location, etc.)
   - Each card has a "Buy" button

**✅ Pass Criteria:** Properties are visible with Buy buttons

---

### Step 4: Open Contact Form
1. Find any property card
2. Click the **"Buy"** button on that property
3. **Expected:**
   - Modal/popup opens
   - Modal displays:
     - Property title and details
     - Your name (pre-filled): "Test User"
     - Your email (pre-filled): "test@example.com"
     - Your phone (pre-filled): "1234567890"
     - Message field with default text
   - "Submit Request" button visible
   - "Cancel" button visible

**✅ Pass Criteria:** Modal opens with all fields properly populated

---

### Step 5: Submit Contact Request
1. Review the pre-filled information
2. (Optional) Modify the message if desired
3. Click **"Submit Request"** button
4. **Expected:**
   - Success message appears (e.g., "Contact request submitted successfully!")
   - Modal closes automatically
   - The "Buy" button on that property changes to **"Show Contact"**

**✅ Pass Criteria:** Request submitted successfully, button state changed

---

### Step 6: View Seller Contact Information
1. Find the same property card (should now show "Show Contact" button)
2. Click the **"Show Contact"** button
3. **Expected:**
   - Seller's contact information is displayed:
     - Owner Name
     - Owner Phone Number
   - Information is clearly visible

**✅ Pass Criteria:** Seller contact information is displayed correctly

---

## 📊 Test Results Checklist

After completing all steps, mark each item:

- [ ] Step 1: Application loads successfully
- [ ] Step 2: Login works correctly
- [ ] Step 3: Buy page displays properties
- [ ] Step 4: Contact form modal opens with pre-filled data
- [ ] Step 5: Contact request submits successfully
- [ ] Step 6: Seller contact information displays

---

## 🐛 Issue Reporting

If you encounter any issues, please note:

1. **Which step failed?**
2. **What was the expected behavior?**
3. **What actually happened?**
4. **Any error messages in the browser console?** (Press F12 to open developer tools)

---

## ✅ Success Criteria

**All 6 steps must pass** for the critical path to be considered successful.

If any step fails, we'll need to investigate and fix the issue before proceeding.

---

## 📝 Next Steps After Testing

Once you've completed the testing:

1. Report back with the results
2. If all tests pass → Feature is ready for deployment
3. If any tests fail → We'll debug and fix the issues

---

**Ready to test?** Open http://localhost:5173 and follow the steps above!
