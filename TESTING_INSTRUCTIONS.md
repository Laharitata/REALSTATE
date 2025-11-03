# Testing Instructions for Enhanced Buy Features

## Issue Encountered During Testing

The backend server needs to be properly restarted to load the new appointment and offer routes.

## How to Test

### Step 1: Stop All Running Servers

**Windows:**
```bash
# Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

**Mac/Linux:**
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Step 2: Start Backend Server

```bash
cd la-project/backend
npm run dev
```

Wait for:
```
Server running on port 5000
MongoDB connected
```

### Step 3: Start Frontend Server

```bash
cd la-project/frontend
npm run dev
```

### Step 4: Run Backend API Tests

```bash
cd la-project/backend
node testEnhancedFeatures.js
```

**Expected Output:**
- ✅ All appointment tests pass
- ✅ All offer tests pass
- ✅ Error handling tests pass

### Step 5: Manual Frontend Testing

1. **Open Browser**: http://localhost:5173 (or 5174)
2. **Login** with your credentials
3. **Navigate to Buy Page**
4. **Click "Buy"** on any property
5. **Test Each Tab**:

#### Tab 1: Contact Seller
- Verify form opens
- Check auto-filled data
- Modify message
- Click "Send Message"
- Verify success notification

#### Tab 2: Book Viewing
- Select a date (tomorrow or later)
- Select a time
- Choose viewing type (In-Person/Virtual/Phone)
- Add optional notes
- Click "Schedule Viewing"
- Verify success notification

#### Tab 3: Make Offer
- Enter offer amount
- Select financing type
- Add terms/conditions
- Click "Submit Offer"
- Verify success notification

### Step 6: Verify Database

```bash
# Connect to MongoDB
mongosh

# Switch to database
use realestate

# Check appointments
db.appointments.find().pretty()

# Check offers
db.offers.find().pretty()

# Check contact requests
db.contactrequests.find().pretty()
```

## Expected Results

### Backend API Tests:
- ✅ 15+ tests should pass
- ✅ Appointments created and retrieved
- ✅ Offers submitted and updated
- ✅ Counter-offers working
- ✅ Error handling correct

### Frontend Tests:
- ✅ Modal opens with 3 tabs
- ✅ Tab switching works
- ✅ All forms submit successfully
- ✅ Success messages display
- ✅ Modal closes after submission

### Database Verification:
- ✅ Appointments saved with correct data
- ✅ Offers saved with correct data
- ✅ All relationships (buyer, property) working

## Troubleshooting

### Issue: Port 5000 Already in Use
**Solution**: Kill the process and restart
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Issue: MongoDB Not Connected
**Solution**: Start MongoDB service
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Issue: Frontend Can't Connect to Backend
**Solution**: 
1. Verify backend is running on port 5000
2. Check CORS is enabled
3. Verify API_URL in frontend

### Issue: Tests Fail
**Solution**:
1. Ensure backend server is running
2. Ensure MongoDB is connected
3. Ensure test user exists (run testEnhancedFeatures.js)
4. Check console for specific errors

## Quick Test Commands

```bash
# Test backend only
cd la-project/backend && node testEnhancedFeatures.js

# Test contact form fix
cd la-project/backend && node testFormSubmissionFix.js

# Check properties
cd la-project/backend && node checkProperties.js

# Seed properties if needed
cd la-project/backend && node seedProperties.js
```

## Success Criteria

- [ ] Backend server starts without errors
- [ ] Frontend server starts without errors
- [ ] All backend API tests pass
- [ ] Modal opens when clicking "Buy"
- [ ] All 3 tabs are accessible
- [ ] Contact form submits successfully
- [ ] Appointment form submits successfully
- [ ] Offer form submits successfully
- [ ] Data is saved in MongoDB
- [ ] No console errors

## Notes

- The backend routes are already added to server.js
- The frontend component (BuyOptionsModal) is created
- PropertyCard is updated to use the new modal
- All models (Appointment, Offer) are created
- Just need to restart the server properly to load new routes

---

**Last Updated**: January 2025
**Status**: Ready for Testing (Server Restart Required)
