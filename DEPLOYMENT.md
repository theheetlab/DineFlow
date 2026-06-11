# DineFlow - Deployment Guide

## Prerequisites

Before deploying, ensure you have accounts on:
- [MongoDB Atlas](https://www.mongodb.com/atlas) (Database)
- [Render](https://render.com) (Backend API)
- [Vercel](https://vercel.com) (Frontend)
- [GitHub](https://github.com) (Code Repository)

---

## Step 1: Database Setup (MongoDB Atlas)

1. **Create a Cluster**
   - Sign in to MongoDB Atlas
   - Click "Build a Cluster" → Choose "M0 Free Tier"
   - Select a cloud provider and region (choose one close to your users)
   - Click "Create Cluster"

2. **Create Database User**
   - Go to "Database Access" under Security
   - Click "Add New Database User"
   - Username: `dineflow` (or your preferred username)
   - Password: Generate a strong password or use `dineflow123`
   - Click "Add User"

3. **Configure Network Access**
   - Go to "Network Access" under Security
   - Click "Add IP Address"
   - For development: Add your current IP
   - For production: Add `0.0.0.0/0` (allows all connections - Render will use this)
   - Click "Confirm"

4. **Get Connection String**
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user's password
   - Replace `myFirstDatabase` with `dineflow`
   - Example: `mongodb+srv://dineflow:password@cluster0.xxxxx.mongodb.net/dineflow?retryWrites=true&w=majority`

## Step 2: Backend Deployment (Render)

1. **Prepare Your Repository**
   - Push your code to GitHub
   - Ensure `backend/package.json` exists with correct start script

2. **Create Web Service on Render**
   - Sign in to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** `dineflow-api`
     - **Root Directory:** `backend`
     - **Runtime:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** Free

3. **Set Environment Variables**
   Click "Advanced" and add:
   - `MONGODB_URI` → Your MongoDB Atlas connection string
   - `JWT_SECRET` → A strong random secret (e.g., generate with `openssl rand -hex 32`)
   - `NODE_ENV` → `production`
   - `PORT` → `5000`

4. **Deploy**
   - Click "Create Web Service"
   - Wait for the build to complete (3-5 minutes)
   - Note your API URL: `https://dineflow-api.onrender.com`

5. **Seed the Database**
   After deployment, run these commands in Render's shell:
   ```
   cd backend
   npm run seed:admin
   npm run seed:data
   ```
   Or run locally: Update your local `.env` with the production MongoDB URI, then run:
   ```bash
   cd backend
   npm run seed:admin
   npm run seed:data
   ```

## Step 3: Frontend Deployment (Vercel)

1. **Update Environment Variable**
   - In `frontend/.env`:
     ```
     REACT_APP_API_URL=https://dineflow-api.onrender.com/api/v1
     ```
   - Commit and push this change

2. **Deploy to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset:** Create React App
     - **Root Directory:** `frontend`
     - **Build and Output Settings:** (leave default)
   - **Environment Variables:**
     - `REACT_APP_API_URL` → `https://dineflow-api.onrender.com/api/v1`
   - Click "Deploy"

3. **Configure SPA Routing (Important!)**
   - Vercel auto-detects Create React App
   - The `vercel.json` file in the frontend directory handles client-side routing
   - Ensure it exists:
     ```json
     {
       "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
     }
     ```

4. **Custom Domain (Optional)**
   - Go to your project on Vercel
   - Click "Domains"
   - Add your custom domain
   - Follow Vercel's DNS configuration instructions

## Step 4: Verify Deployment

1. **Health Check**
   - Visit: `https://dineflow-api.onrender.com/api/v1/health`
   - Expected: `{ "status": "ok", "timestamp": "..." }`

2. **Test the Frontend**
   - Visit: `https://dineflow.vercel.app`
   - Browse menu, make a reservation, submit contact form

3. **Test Admin Login**
   - Visit: `https://dineflow.vercel.app/admin/login`
   - Login with: `admin@dineflow.com` / `Admin@123`

## Updating Your Site

After making changes to your code:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```

2. **Automatic Redeployment:**
   - Render and Vercel both auto-deploy when you push to the main branch
   - Deployment takes 2-5 minutes

3. **Manual Redeploy:**
   - Render: Go to dashboard → click "Manual Deploy" → "Deploy latest commit"
   - Vercel: Go to dashboard → the latest deployment is automatically triggered

## Troubleshooting

### Backend Issues
- **"MongoDB Connection Error"**: Check MONGODB_URI in Render env vars
- **"JWT Secret not set"**: Ensure JWT_SECRET env var is configured
- **Port binding errors**: Render sets PORT env var automatically

### Frontend Issues
- **Blank page on Vercel**: Check REACT_APP_API_URL env var
- **CORS errors**: Ensure backend CORS is configured correctly (it's set to allow all origins)
- **Routes not working**: Ensure vercel.json exists with rewrite rules

### Database Issues
- **Connection timeout**: Check Network Access in MongoDB Atlas (add 0.0.0.0/0 for Render)
- **Authentication failed**: Verify username and password in connection string
- **Database not found**: Ensure `dineflow` is the database name in the connection string

## Production Checklist

- [ ] Strong MONGODB_URI with proper credentials
- [ ] Strong JWT_SECRET (32+ characters, random)
- [ ] NODE_ENV set to "production"
- [ ] CORS configured for production domain
- [ ] Rate limiting considered
- [ ] HTTPS enabled (automatic on Render & Vercel)
- [ ] Error logging configured
- [ ] Database backups scheduled (Atlas auto-backup on paid plans)
