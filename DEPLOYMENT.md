# Production Deployment Guide

This guide will help you deploy MatchMySkill to production using Vercel (Frontend) and Render (Backend).

## Prerequisites

- GitHub account with the repository pushed
- Vercel account (https://vercel.com)
- Render account (https://render.com)
- Google Gemini API key (https://makersuite.google.com/app/apikey)
- Cloudinary account (https://cloudinary.com)

## Setup Steps

### 1. Get Required API Keys

#### Google Gemini API Key
1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy your API key and save it securely

#### Cloudinary Credentials
1. Go to https://cloudinary.com and sign up
2. Navigate to Dashboard
3. Copy your:
   - Cloud Name
   - API Key
   - API Secret

### 2. Backend Deployment (Render)

#### Step 1: Push Backend to GitHub
```bash
git add Backend/
git commit -m "Backend: Add environment variables and production config"
git push origin main
```

#### Step 2: Deploy to Render
1. Go to https://render.com/dashboard
2. Click "New +" → "Web Service"
3. Select your GitHub repository
4. Configure deployment:
   - **Name:** `matchmyskill-backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free (or paid for better performance)

5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `10000`
   - `CLOUDINARY_CLOUD_NAME` = Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY` = Your Cloudinary API key
   - `CLOUDINARY_API_SECRET` = Your Cloudinary API secret
   - `FRONTEND_URL` = Your Vercel frontend URL (you'll get this in step 3)

6. Click "Create Web Service"
7. Wait for deployment to complete (5-10 minutes)
8. Copy your backend URL (e.g., `https://matchmyskill-backend.onrender.com`)

### 3. Frontend Deployment (Vercel)

#### Step 1: Update Environment Variables
Edit `Frontend/.env` (or create it from `.env.example`):
```env
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
REACT_APP_BACKEND_URL=https://matchmyskill-backend.onrender.com
```

#### Step 2: Push Frontend to GitHub
```bash
git add Frontend/
git commit -m "Frontend: Update environment variables for production"
git push origin main
```

#### Step 3: Deploy to Vercel
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Configure:
   - **Framework:** Create React App
   - **Root Directory:** `Frontend`

5. Add Environment Variables:
   - `REACT_APP_GEMINI_API_KEY` = Your Gemini API key
   - `REACT_APP_BACKEND_URL` = Your Render backend URL

6. Click "Deploy"
7. Wait for deployment (2-5 minutes)
8. Your frontend URL will be something like: `https://match-my-skill-plby.vercel.app`

#### Step 4: Update Backend CORS (Back to Render)
1. Go back to your Render service
2. Update `FRONTEND_URL` environment variable with your Vercel URL
3. Render will automatically redeploy with new environment variables

### 4. Verify Deployment

#### Test Backend
```bash
curl https://matchmyskill-backend.onrender.com/
# Should return: MatchMySkill backend is live!
```

#### Test Frontend
1. Visit your Vercel URL
2. Upload a resume (PDF, DOCX, or TXT)
3. Paste a job description
4. Click "Analyze Resume"
5. Verify analysis completes and results display
6. Download PDF report to test PDF generation

### 5. Monitor & Troubleshoot

#### Backend Logs (Render)
1. Go to your Render service dashboard
2. Click "Logs" tab
3. Watch for errors during requests

#### Frontend Build (Vercel)
1. Go to your Vercel project
2. Click "Deployments"
3. Click recent deployment
4. Check "Build Logs" for any errors

#### Common Issues

**Issue:** "Gemini API key is not configured"
- Solution: Check that `REACT_APP_GEMINI_API_KEY` is set in Vercel environment variables
- Note: Vercel requires restart after env var changes (automatic with git push)

**Issue:** "Upload failed on server"
- Solution: Check backend logs on Render
- Ensure Cloudinary credentials are correct
- Verify `FRONTEND_URL` matches your Vercel domain

**Issue:** Backend returns 429 (Too Many Requests)
- Solution: Rate limiting is active (30 requests per 15 minutes per IP)
- Wait 15 minutes before trying again
- For production, adjust rate limit in `Backend/server.js`

**Issue:** "Analysis timeout"
- Solution: Gemini API is slow. Try with shorter job description
- Check Gemini API status: https://status.cloud.google.com/

### 6. Post-Deployment Checklist

- [ ] Backend deployed and `/` endpoint returns "MatchMySkill backend is live!"
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set in both Vercel and Render
- [ ] Tested file upload (PDF, DOCX, TXT)
- [ ] Tested resume analysis
- [ ] Tested PDF report download
- [ ] Verified API rate limiting working
- [ ] Confirmed CORS allows frontend domain
- [ ] Gemini API quota adequate for expected users

### 7. Monitoring & Maintenance

#### Enable Render Restart Policy (Free tier)
1. Render free tier services spin down after 15 minutes of inactivity
2. To keep service active:
   - Option A: Upgrade to paid plan
   - Option B: Use external service like https://kaffeine.herokuapp.com (monitor your Render URL)
   - Option C: Accept the 30-second cold start on first request after idle

#### Track Usage
- **Gemini API:** Monitor quota at https://makersuite.google.com/app/usage
- **Cloudinary:** Monitor storage at https://cloudinary.com/console/
- **Render:** Free tier has usage limits; upgrade if needed

#### Scale as Needed
- Vercel: Free tier auto-scales. Consider Pro for better performance.
- Render: Upgrade from Free to Standard/Premium for production SLA.
- Gemini API: Request quota increase if hitting limits.

## Local Development

To test before deploying:

1. **Backend Setup:**
```bash
cd Backend
npm install
cp .env.example .env
# Edit .env with your Cloudinary credentials
npm start
# Backend runs on http://localhost:10000
```

2. **Frontend Setup:**
```bash
cd Frontend
npm install
cp .env.example .env
# Edit .env with your Gemini API key and http://localhost:10000 as backend
npm start
# Frontend runs on http://localhost:3000
```

## Security Best Practices (Already Implemented)

✅ CORS validation - allows only frontend domain
✅ Rate limiting - 30 requests per 15 minutes per IP
✅ File size limits - 10MB max
✅ File type validation - only PDF, DOCX, DOC, TXT
✅ Error handling - sensitive errors not exposed
✅ API timeout - 60 seconds max for Gemini API
✅ Input validation - minimum job description length required

## Next Steps

1. Set up monitoring/alerting (Sentry, LogRocket, etc.)
2. Add analytics (Google Analytics, Mixpanel, etc.)
3. Implement user authentication if tracking users
4. Add database for persisting analysis history
5. Set up CI/CD pipeline for automated deployments
6. Add automated testing before deployments
