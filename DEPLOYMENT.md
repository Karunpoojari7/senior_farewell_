# 🚀 Senior Mischief Farewell - End-to-End Deployment Guide

This guide details step-by-step instructions to deploy the **Backend on Render** and the **Frontend on Vercel**.

---

## 🛠️ Step 1: Deploy Backend on Render (Web Service)

1. Open [Render Dashboard](https://dashboard.render.com) and click **New +** -> **Web Service**.
2. Connect your GitHub repository: `Karunpoojari7/senior_farewell_`.
3. Configure the service settings:
   - **Name**: `senior-mischief-backend`
   - **Region**: Oregon (US West) or your preferred region
   - **Branch**: `main`
   - **Root Directory**: `backend`  *(⚠️ Important: Must specify `backend`)*
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Add **Environment Variables** under the Environment tab:

   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Enables production optimizations |
   | `MOCK_AI` | `true` | Enables mock mode for fast event generation |
   | `ADMIN_SECRET` | `mischief2026` | Secret password for Creator Admin nomination portal |
   | `FRONTEND_URL` | `https://<your-vercel-app>.vercel.app` | (Update after deploying frontend) |

5. Click **Create Web Service**.
6. Render will build and deploy your API. Copy your live backend URL (e.g. `https://senior-mischief-backend.onrender.com`).

---

## ⚡ Step 2: Deploy Frontend on Vercel

1. Open [Vercel New Project](https://vercel.com/new).
2. Import repository `Karunpoojari7/senior_farewell_`.
3. Configure Project Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click Edit -> select `frontend`  *(⚠️ Important: Must specify `frontend`)*
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add **Environment Variables**:

   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `VITE_API_URL` | `https://senior-mischief-backend.onrender.com` | Your live Render backend URL from Step 1 |

5. Click **Deploy**.
6. Copy your live Vercel frontend URL (e.g. `https://senior-farewell.vercel.app`).

---

## 🔗 Step 3: Final CORS Linking

1. Copy your Vercel domain (e.g. `https://senior-farewell.vercel.app`).
2. Go to **Render Dashboard** -> **senior-mischief-backend** -> **Environment**.
3. Update `FRONTEND_URL` to `https://senior-farewell.vercel.app`.
4. Click **Save Changes**.

---

## 🔐 Creator Admin Access

Once deployed, access all submitted senior award nominations at:
`https://<your-vercel-app>.vercel.app/?admin=true`

Passcode: `mischief2026`
