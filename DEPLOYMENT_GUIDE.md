# 🚀 Deployment & Domain Guide

## Phase 1: Deploying the Frontend (Next.js)
The easiest way to deploy your dashboard is **Vercel**.

1.  **Push Code to GitHub**:
    *   Create a repository on GitHub (e.g., `kok-risk-frontend`).
    *   Push your `frontend/` folder to it.
2.  **Connect to Vercel**:
    *   Go to [vercel.com](https://vercel.com) and sign up.
    *   Click "Add New" > "Project".
    *   Select your GitHub repo.
3.  **Configure Environment**:
    *   In Vercel Project Settings, add `NEXT_PUBLIC_API_URL`.
    *   Value: `https://your-backend-url.onrender.com` (See Phase 2).
4.  **Deploy**: Click "Deploy". You will get a link like `kok-risk.vercel.app`.

---

## Phase 2: Deploying the Backend (Express API)
For the backend, we recommend **Render** or **Railway** (easier than AWS).

1.  **Push Backend to GitHub**:
    *   Push your `src/` code (root folder) to a repo.
2.  **Create Web Service on Render**:
    *   Go to [render.com](https://render.com).
    *   "New" > "Web Service".
    *   Connect your repo.
    *   **Build Command:** `npm install && npm run build`
    *   **Start Command:** `npm start`
3.  **Environment Variables**:
    *   Add `JWT_SECRET`, `DATABASE_URL` (if using a real DB).

---

## Phase 3: Linking Your Custom Domain (e.g., `kok-risk.com`)

### Step 1: Buy the Domain
*   Purchase your domain from **Namecheap**, **GoDaddy**, or **Vercel** directly.

### Step 2: Connect to Frontend (Vercel)
1.  Go to your Vercel Project Dashboard.
2.  Click **Settings** > **Domains**.
3.  Enter `kok-risk.com` (or your chosen domain) and click **Add**.
4.  **Update DNS**: Vercel will give you two records to add to your Domain Registrar (e.g., GoDaddy):
    *   **Type:** `A Record` | **Value:** `76.76.21.21` (Example)
    *   **Type:** `CNAME` | **Value:** `cname.vercel-dns.com`

### Step 3: Connect to Backend (API Subdomain)
1.  In your Domain Registrar, create a subdomain for the API.
2.  **Type:** `CNAME`
3.  **Name:** `api` (Result: `api.kok-risk.com`)
4.  **Value:** `your-app-name.onrender.com`

---

## Phase 4: Verification
Once DNS propagates (can take 1-24 hours):
*   Frontend: `https://www.kok-risk.com`
*   Backend: `https://api.kok-risk.com/v1/health`

**Note:** Both Vercel and Render provide **Free SSL (HTTPS)** automatically.
