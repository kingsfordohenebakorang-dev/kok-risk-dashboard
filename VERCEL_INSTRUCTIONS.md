# 🚀 How to Deploy Your Dashboard to Vercel

Since your dashboard code lives in the `frontend/` folder, follow these steps to deploy correctly.

## Step 1: Push to GitHub
1.  Go to [GitHub.com](https://github.com/new) and create a new repository (e.g., `kok-risk-dashboard`).
2.  Run these commands in your terminal (VS Code):
    ```bash
    git init
    git add .
    git commit -m "Initial commit of dashboard"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/kok-risk-dashboard.git
    git push -u origin main
    ```

## Step 2: Connect Vercel (The Important Part)
1.  Go to [Vercel.com](https://vercel.com/new).
2.  Select your new `kok-risk-dashboard` repository.
3.  **⚠️ CRITICAL STEP:**
    *   Look for the **"Root Directory"** setting (it usually says ` ./ `).
    *   Click "Edit" and change it to: `frontend`
    *   *If you do not do this, the build will fail.*

## Step 3: Environment Variables
1.  Open "Environment Variables" section in Vercel.
2.  Add:
    *   `NEXT_PUBLIC_API_URL` -> `https://api.kok-risk.com` (or your Render Backend URL).

## Step 4: Click Deploy!
Vercel will build your site. In ~1 minute, you will get a live link like:
`https://kok-risk-dashboard.vercel.app`

That's it! Your `localhost:3000` is now global. 🌍
