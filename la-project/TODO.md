# Fix Signup and Login Not Working

## Tasks
- [x] Remove Vercel configuration files (vercel.json from frontend and backend)
- [x] Create Netlify configuration for frontend (netlify.toml)
- [x] Create Render configuration for backend (render.yaml)
- [x] Update Signup.jsx: Replace "https://realstate-1f928m2sl-laharis-projects-185ef7fa.vercel.app" with "https://realstate-5.onrender.com"
- [x] Update Login.jsx: Replace "https://realstate-1f928m2sl-laharis-projects-185ef7fa.vercel.app" with "https://realstate-5.onrender.com"
- [x] Update api.js: Replace "https://realstate-1f928m2sl-laharis-projects-185ef7fa.vercel.app" with "https://realstate-5.onrender.com"
- [x] Update Profile.jsx: Replace "https://realstate-1f928m2sl-laharis-projects-185ef7fa.vercel.app" with "https://realstate-5.onrender.com"
- [x] Update mongoose version to ^8.0.0 in backend/package.json
- [x] Deploy backend to Render using render.yaml
- [x] Deploy frontend to Netlify using netlify.toml
- [x] Add .env file in frontend with REACT_APP_BACKEND_URL=https://realstate-5.onrender.com
- [x] Update Signup.jsx, Login.jsx, api.js, Profile.jsx to use process.env.REACT_APP_BACKEND_URL
- [x] Commit and push changes to GitHub
- [x] Fix Netlify build config to point to frontend directory
- [x] Redeploy frontend to Netlify
- [ ] Test signup and login on new Netlify URL
