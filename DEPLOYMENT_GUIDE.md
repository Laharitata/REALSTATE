# 🚀 Deployment Guide - Real Estate Application

Complete step-by-step guide to deploy both frontend and backend of your real estate application.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Backend Deployment (Render)](#backend-deployment-render)
3. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment Steps](#post-deployment-steps)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account with your code pushed
- ✅ MongoDB Atlas database (already configured)
- ✅ Render account (for backend) - https://render.com
- ✅ Vercel account (for frontend) - https://vercel.com
- ✅ All environment variables ready

---

## 🖥️ Backend Deployment (Render)

### Step 1: Create Render Account

1. Go to https://render.com
2. Click **"Get Started"** or **"Sign Up"**
3. Sign up with GitHub (recommended for easy integration)
4. Authorize Render to access your GitHub repositories

### Step 2: Create New Web Service

1. From Render Dashboard, click **"New +"** button
2. Select **"Web Service"**
3. Connect your GitHub repository:
   - Click **"Connect account"** if not already connected
   - Find and select your repository: `Laharitata/REALSTATE`
   - Click **"Connect"**

### Step 3: Configure Web Service

Fill in the following details:

**Basic Settings:**
- **Name:** `realstate-backend` (or your preferred name)
- **Region:** Choose closest to your users (e.g., Oregon, Frankfurt)
- **Branch:** `main`
- **Root Directory:** `la-project/backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select **"Free"** (for testing) or **"Starter"** (for production)

### Step 4: Add Environment Variables

Click **"Advanced"** and add these environment variables:

```
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/realstate?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here
PORT=5000
NODE_ENV=production
```

**Important:** Replace with your actual MongoDB credentials!

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Once deployed, you'll get a URL like: `https://realstate-backend.onrender.com`
4. **Save this URL** - you'll need it for frontend!

### Step 6: Verify Backend Deployment

Test your backend:
```bash
# Test health endpoint
curl https://your-backend-url.onrender.com/

# Test properties endpoint
curl https://your-backend-url.onrender.com/api/properties
```

---

## 🌐 Frontend Deployment (Vercel)

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Sign up with GitHub (recommended)
4. Authorize Vercel to access your repositories

### Step 2: Import Project

1. From Vercel Dashboard, click **"Add New..."** → **"Project"**
2. Import your GitHub repository:
   - Find `Laharitata/REALSTATE`
   - Click **"Import"**

### Step 3: Configure Project

**Framework Preset:**
- Vercel should auto-detect **"Vite"**

**Root Directory:**
- Click **"Edit"**
- Set to: `la-project/frontend`
- Click **"Continue"**

**Build Settings:**
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Step 4: Add Environment Variables

Click **"Environment Variables"** and add:

```
VITE_API_URL=https://your-backend-url.onrender.com
```

**Important:** Replace with your actual Render backend URL from Step 5 above!

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for deployment (3-5 minutes)
3. Once deployed, you'll get a URL like: `https://your-project.vercel.app`

### Step 6: Verify Frontend Deployment

1. Visit your Vercel URL
2. Test the application:
   - ✅ Login page loads
   - ✅ Can sign up/login
   - ✅ Properties display on Buy page
   - ✅ Can add properties on Sell page
   - ✅ Contact Seller feature works

---

## 🔐 Environment Variables Reference

### Backend (.env on Render)

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/realstate?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=5000
NODE_ENV=production
```

### Frontend (.env on Vercel)

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

**Security Notes:**
- ⚠️ Never commit `.env` files to Git
- ⚠️ Use strong, unique JWT_SECRET
- ⚠️ Keep MongoDB credentials secure
- ⚠️ Update CORS settings in backend if needed

---

## ✅ Post-Deployment Steps

### 1. Update CORS Settings (if needed)

If you get CORS errors, update `backend/server.js`:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'https://your-frontend.vercel.app',
    'http://localhost:5173' // for local development
  ],
  credentials: true
}));
```

### 2. Test All Features

- ✅ User Registration
- ✅ User Login
- ✅ View Properties
- ✅ Add Property
- ✅ Edit Property
- ✅ Delete Property
- ✅ Wishlist functionality
- ✅ Contact Seller feature
- ✅ Profile management

### 3. Set Up Custom Domain (Optional)

**For Vercel (Frontend):**
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

**For Render (Backend):**
1. Go to Settings → Custom Domain
2. Add your custom domain
3. Update DNS records as instructed

### 4. Enable HTTPS

Both Render and Vercel provide free SSL certificates automatically!

### 5. Monitor Your Application

**Render Dashboard:**
- View logs: Settings → Logs
- Monitor metrics: Metrics tab
- Set up alerts: Settings → Notifications

**Vercel Dashboard:**
- View deployments: Deployments tab
- Check analytics: Analytics tab
- Monitor performance: Speed Insights

---

## 🐛 Troubleshooting

### Backend Issues

**Problem: "Application failed to start"**
```bash
Solution:
1. Check Render logs for errors
2. Verify all environment variables are set
3. Ensure MongoDB connection string is correct
4. Check if PORT is set to 5000
```

**Problem: "Cannot connect to MongoDB"**
```bash
Solution:
1. Verify MONGO_URI is correct
2. Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for Render)
3. Ensure database user has correct permissions
```

**Problem: "CORS errors"**
```bash
Solution:
1. Add your Vercel URL to CORS origins in server.js
2. Redeploy backend after changes
```

### Frontend Issues

**Problem: "Failed to fetch from API"**
```bash
Solution:
1. Verify VITE_API_URL is set correctly
2. Check if backend is running (visit backend URL)
3. Check browser console for specific errors
4. Verify CORS is configured on backend
```

**Problem: "Environment variables not working"**
```bash
Solution:
1. Ensure variables start with VITE_
2. Redeploy after adding variables
3. Clear browser cache
```

**Problem: "Build failed"**
```bash
Solution:
1. Check Vercel build logs
2. Verify package.json has correct scripts
3. Ensure all dependencies are in package.json
4. Try building locally first: npm run build
```

---

## 📊 Deployment Checklist

### Before Deployment
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas database created and configured
- [ ] All environment variables documented
- [ ] Local testing completed
- [ ] Dependencies up to date

### Backend Deployment
- [ ] Render account created
- [ ] Web service created and configured
- [ ] Environment variables added
- [ ] Backend deployed successfully
- [ ] Backend URL saved
- [ ] API endpoints tested

### Frontend Deployment
- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Root directory set correctly
- [ ] VITE_API_URL configured with backend URL
- [ ] Frontend deployed successfully
- [ ] Application tested end-to-end

### Post-Deployment
- [ ] All features tested in production
- [ ] CORS configured correctly
- [ ] Custom domains configured (if applicable)
- [ ] Monitoring set up
- [ ] Team members notified

---

## 🔄 Continuous Deployment

Both Render and Vercel support automatic deployments:

**Automatic Deployments:**
- Push to `main` branch → Automatic deployment
- Pull requests → Preview deployments
- Rollback available if issues occur

**Manual Deployments:**
- Render: Click "Manual Deploy" → "Deploy latest commit"
- Vercel: Deployments tab → "Redeploy"

---

## 📞 Support Resources

**Render:**
- Documentation: https://render.com/docs
- Community: https://community.render.com
- Status: https://status.render.com

**Vercel:**
- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions
- Status: https://www.vercel-status.com

**MongoDB Atlas:**
- Documentation: https://docs.atlas.mongodb.com
- Support: https://support.mongodb.com

---

## 🎉 Success!

Once both deployments are complete:

1. **Frontend URL:** `https://your-project.vercel.app`
2. **Backend URL:** `https://your-backend.onrender.com`
3. **Database:** MongoDB Atlas (already configured)

Your real estate application is now live and accessible worldwide! 🌍

---

## 📝 Quick Reference Commands

```bash
# Test backend locally
cd la-project/backend
npm install
npm run dev

# Test frontend locally
cd la-project/frontend
npm install
npm run dev

# Build frontend for production
npm run build

# Push changes to trigger deployment
git add .
git commit -m "Your commit message"
git push origin main
```

---

**Last Updated:** February 2, 2025
**Version:** 1.0.0
