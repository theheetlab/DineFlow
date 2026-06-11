# DineFlow - Beginner-Friendly Guide

This guide explains everything in simple terms. No technical jargon.

---

## What is MongoDB Atlas?

**MongoDB Atlas** is a database in the cloud. Think of it as a giant Excel sheet stored on the internet.

### What you need to do:
1. Go to https://www.mongodb.com/atlas
2. Sign up for free (no credit card needed)
3. Create a cluster (free tier called "M0")
4. Create a database user (username + password)
5. Get your connection string (looks like a long URL)
6. Allow all IP addresses (set to 0.0.0.0/0)

### Important:
- Your database is where all data lives (menu items, reservations, customer info, etc.)
- Never share your connection string publicly
- Keep your username and password safe

---

## What is Render (Backend)?

**Render** is where the "brain" of your website runs. It handles all the logic.

### Simple explanation:
- When someone makes a reservation on your website, the code that processes it lives on Render
- When someone logs in as admin, the code that checks their password lives on Render

### What you need to do:
1. Go to https://render.com
2. Sign up (connect with GitHub)
3. Create a "Web Service"
4. Point it to your GitHub repository
5. Set environment variables (secret information like database URL)
6. Wait for it to build (3-5 minutes)

### Cost: Free tier available

---

## What is Vercel (Frontend)?

**Vercel** is where your website's visual part lives. It's what users see in their browser.

### Simple explanation:
- All the pretty pages (Home, Menu, Gallery) are stored on Vercel
- When someone visits your website, Vercel sends them all the files needed to display it

### What you need to do:
1. Go to https://vercel.com
2. Sign up (connect with GitHub)
3. Import your GitHub repository
4. Set one environment variable: `REACT_APP_API_URL`
5. Click Deploy

### Cost: Free tier available

---

## What are Environment Variables?

**Environment variables** are like secret notes that your app reads but nobody can see in your code.

### Examples:
- `MONGODB_URI` = Your database address and password
- `JWT_SECRET` = A secret key for security
- `REACT_APP_API_URL` = Where your backend lives

### Why they matter:
- If you put passwords in your code and push to GitHub, anyone can see them
- Environment variables keep secrets... secret

### Rules:
- Never put real passwords in your code files
- Always use .env files locally
- Set them in Render and Vercel dashboards

---

## GitHub Workflow

### Step 1: Make changes on your computer
Edit files, add new features, fix bugs.

### Step 2: Save to GitHub
Open terminal in your project folder and type:
```bash
git add .
git commit -m "What you changed"
git push
```

### Step 3: Automatic deployment
- Render and Vercel automatically update when you push
- Wait 2-5 minutes for changes to go live

### Branching (for safe development):
- `main` = Live website (do not break this!)
- Create a new branch for testing: `git checkout -b new-feature`
- Test it, then merge to main

---

## Updating Your Website

### To change content (menu items, etc.):
1. Log in to admin dashboard at yoursite.com/admin
2. Make changes there (no coding needed)

### To change design or add features:
1. Edit the code on your computer
2. Test locally (run `npm start` in frontend folder)
3. Push to GitHub
4. Wait for auto-deploy

### Quick update checklist:
- Test on your computer first
- Check that forms still work
- Make sure admin login still works
- Push changes

---

## Maintenance

### Daily:
- Check admin dashboard for new reservations
- Respond to contact form messages
- Mark reservations as confirmed/completed

### Weekly:
- Check if MongoDB Atlas is running (free tier has limits)
- Review website speed
- Backup data (MongoDB Atlas has auto-backup on paid plans)

### Monthly:
- Update dependencies (run `npm update` in both frontend and backend)
- Check for security updates
- Review analytics

---

## Domain Connection

### To use your own domain (e.g., www.yourrestaurant.com):

**For Vercel (frontend):**
1. Buy a domain from GoDaddy, Namecheap, etc.
2. Go to your Vercel dashboard
3. Select your project → Domains
4. Add your domain
5. Follow Vercel's instructions to update DNS records

**For Render (backend):**
1. Render provides a .onrender.com URL automatically
2. Custom domains require paid Render plan

---

## Common Problems & Solutions

### "Website shows blank page"
- Check if `REACT_APP_API_URL` is set correctly in Vercel
- Check Vercel deployment logs for errors

### "Cannot make reservation"
- Check if backend is running (visit your-api.onrender.com/api/v1/health)
- Check MongoDB Atlas connection string
- Check Render logs

### "Admin login not working"
- Run `npm run seed:admin` to create admin account
- Check email and password
- Check JWT_SECRET environment variable

### "Slow website"
- Images might be too large (use compressed images)
- Check internet connection
- Free tier of Render may "sleep" after inactivity (wakes up on first request)

---

## Need Help?

- Check the error logs in Render and Vercel dashboards
- Review MongoDB Atlas logs
- Google the error message
- Ask for help in the project's GitHub issues

Remember: Every problem has been solved before. Just search for the error message!
