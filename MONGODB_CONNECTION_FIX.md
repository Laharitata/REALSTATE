# MongoDB Connection Fix

## Issue Identified

The backend server has a fallback to localhost MongoDB connection:

```javascript
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/realestate";
```

If the `MONGO_URI` environment variable is not properly set, the application tries to connect to a local MongoDB instance instead of your cloud database (MongoDB Atlas).

## Solution

### Step 1: Check Your .env File

Navigate to `la-project/backend/` and check if `.env` file exists and has the correct MongoDB URI.

**The .env file should contain:**

```env
MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/realestate?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here
PORT=5000
```

### Step 2: Get Your MongoDB Atlas Connection String

If you don't have the connection string:

1. **Login to MongoDB Atlas**: https://cloud.mongodb.com/
2. **Go to your cluster**
3. **Click "Connect"**
4. **Choose "Connect your application"**
5. **Copy the connection string**
6. **Replace `<password>` with your actual password**
7. **Replace `<dbname>` with `realestate`**

**Example:**
```
mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/realestate?retryWrites=true&w=majority
```

### Step 3: Create/Update .env File

**Windows Command:**
```bash
cd la-project/backend
echo MONGO_URI=your-mongodb-atlas-uri-here > .env
echo JWT_SECRET=your-secret-key >> .env
echo PORT=5000 >> .env
```

**Or manually create the file:**

1. Open `la-project/backend/` folder
2. Create a new file named `.env` (note the dot at the beginning)
3. Add the content:

```env
MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/realestate?retryWrites=true&w=majority
JWT_SECRET=mysecretkey123
PORT=5000
```

### Step 4: Verify .env is Not in Git

Check `.gitignore` file includes `.env`:

```bash
cd la-project
type .gitignore | findstr ".env"
```

If `.env` is not listed, add it:

```bash
echo .env >> .gitignore
```

### Step 5: Restart Backend Server

```bash
cd la-project/backend
npm run dev
```

**Expected Output:**
```
Server running on port 5000
MongoDB connected
```

If you see "MongoDB connected", the connection is successful!

### Step 6: Test the Connection

Run the connection test:

```bash
cd la-project/backend
node testConnection.js
```

**Expected Output:**
```
✅ MongoDB connected successfully
Database: realestate
Collections: users, properties, contactrequests, appointments, offers
```

## Common Issues and Solutions

### Issue 1: "MongoNetworkError: failed to connect to server"

**Cause:** Wrong connection string or network issue

**Solution:**
1. Verify your MongoDB Atlas connection string
2. Check if your IP address is whitelisted in MongoDB Atlas
3. Go to MongoDB Atlas → Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)

### Issue 2: "Authentication failed"

**Cause:** Wrong username or password

**Solution:**
1. Go to MongoDB Atlas → Database Access
2. Verify your database user credentials
3. Reset password if needed
4. Update `.env` file with correct credentials

### Issue 3: ".env file not found"

**Cause:** File doesn't exist or wrong location

**Solution:**
1. Ensure `.env` is in `la-project/backend/` directory
2. File name must be exactly `.env` (with dot, no extension)
3. On Windows, create via command line to avoid `.env.txt`

### Issue 4: "Still connecting to localhost"

**Cause:** `.env` file not being read

**Solution:**
1. Verify `dotenv` package is installed:
   ```bash
   cd la-project/backend
   npm list dotenv
   ```
2. If not installed:
   ```bash
   npm install dotenv
   ```
3. Verify server.js has:
   ```javascript
   require('dotenv').config();
   ```
4. Restart the server completely

### Issue 5: "Connection string is invalid"

**Cause:** Special characters in password not URL-encoded

**Solution:**
If your password contains special characters like `@`, `#`, `$`, etc., they need to be URL-encoded:

- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`

**Example:**
- Password: `myP@ss#123`
- Encoded: `myP%40ss%23123`

## Deployment Considerations

### For Render.com:

Add environment variables in Render dashboard:
1. Go to your service
2. Click "Environment"
3. Add:
   - `MONGO_URI` = your MongoDB Atlas URI
   - `JWT_SECRET` = your secret key
   - `PORT` = 5000

### For Vercel:

Add environment variables in Vercel dashboard:
1. Go to your project
2. Click "Settings" → "Environment Variables"
3. Add the same variables

### For Netlify:

Add environment variables in Netlify dashboard:
1. Go to Site settings
2. Click "Build & deploy" → "Environment"
3. Add the variables

## Verification Checklist

- [ ] `.env` file exists in `la-project/backend/`
- [ ] `MONGO_URI` is set to MongoDB Atlas connection string
- [ ] Password in connection string is URL-encoded if needed
- [ ] IP address is whitelisted in MongoDB Atlas
- [ ] `dotenv` package is installed
- [ ] Server restarts successfully
- [ ] "MongoDB connected" message appears
- [ ] Test connection script passes
- [ ] Form submissions work without errors

## Quick Test

After fixing the connection, test the form submission:

```bash
# Terminal 1: Start backend
cd la-project/backend
npm run dev

# Terminal 2: Run test
cd la-project/backend
node testFormSubmissionFix.js
```

All tests should pass with ✅ marks.

## Need Help?

If you're still having issues:

1. Check the exact error message in the terminal
2. Verify MongoDB Atlas cluster is running
3. Check if you have network connectivity
4. Try connecting with MongoDB Compass using the same URI
5. Check backend logs for detailed error messages

---

**Last Updated:** January 2025
**Status:** Configuration Guide
