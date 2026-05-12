# Algebra Learning Tool

A monorepo with a **Next.js frontend** and **Express.js backend**, using **Supabase** for authentication and database, deployable to **Railway**.

## Project Structure

```
algebra-learning-tool/
├── apps/
│   ├── frontend/    # Next.js 14 (App Router) — Auth UI + Dashboard
│   └── backend/     # Express.js API — REST endpoints
├── packages/
│   └── shared/      # Shared TypeScript types
├── turbo.json       # Turborepo pipeline config
└── package.json     # npm workspace root
```

## Prerequisites

- **Node.js** >= 20
- **npm** >= 10
- A **Supabase** account ([supabase.com](https://supabase.com))
- A **Railway** account ([railway.app](https://railway.app)) — for deployment
- A **GitHub** account — for Railway deployment

---

## 🚀 Local Development Setup

### 1. Install dependencies

```bash
cd algebra-learning-tool
npm install
```

### 2. Connect to Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. From **Project Settings → API**, copy:
   - **Project URL**
   - **anon / public key**
   - **service_role key** (keep this secret!)
3. In the Supabase Dashboard, go to **Authentication → Providers → Email** and:
   - Make sure **Email** provider is **enabled**
   - **Disable "Confirm email"** (toggle it off) — this lets users register without email verification
4. Set up environment variables:

**Frontend** — copy the example and fill in values:
```bash
cp apps/frontend/.env.local.example apps/frontend/.env.local
```

Edit `apps/frontend/.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

**Backend** — copy the example and fill in values:
```bash
cp apps/backend/.env.example apps/backend/.env
```

Edit `apps/backend/.env`:
```
PORT=4000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
FRONTEND_URL=http://localhost:3000
```

### 3. Run the development servers

```bash
# Start both frontend and backend
npm run dev
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:4000](http://localhost:4000)
- **Backend health check**: [http://localhost:4000/health](http://localhost:4000/health)
- **Hello World API**: [http://localhost:4000/api/hello](http://localhost:4000/api/hello)

### 4. Test the flow

1. Open [http://localhost:3000](http://localhost:3000) — redirects to `/login`
2. Click "Sign up" → create an account
3. After registration, you'll land on `/dashboard`
4. Dashboard shows "Hello World!" fetched from the backend API
5. Click "Sign Out" to log out

---

## 🚂 Deploying to Railway

### 1. Push to GitHub

```bash
cd algebra-learning-tool
git init
git add .
git commit -m "Initial commit: monorepo setup"
git remote add origin https://github.com/YOUR_USER/algebra-learning-tool.git
git push -u origin main
```

### 2. Create a Railway Project

1. Go to [railway.app](https://railway.app) and sign in
2. Click **"New Project"**

### 3. Add the Backend Service

1. Click **"New Service"** → **"GitHub Repo"** → select `algebra-learning-tool`
2. Go to the service **Settings**:
   - **Root Directory**: `/apps/backend`
   - **Watch Paths**: `/apps/backend/**`, `/packages/shared/**`
3. Go to **Variables** and add:
   ```
   PORT=4000
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   FRONTEND_URL=<will set after frontend deploy>
   ```
4. Go to **Settings → Networking** → **Generate Domain** (e.g., `backend-xxx.up.railway.app`)

### 4. Add the Frontend Service

1. Click **"New Service"** → **"GitHub Repo"** → select `algebra-learning-tool` (same repo)
2. Go to the service **Settings**:
   - **Root Directory**: `/apps/frontend`
   - **Watch Paths**: `/apps/frontend/**`, `/packages/shared/**`
3. Go to **Variables** and add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_BACKEND_URL=https://backend-xxx.up.railway.app
   ```
4. Go to **Settings → Networking** → **Generate Domain** (e.g., `frontend-xxx.up.railway.app`)

### 5. Update Cross-References

1. Go back to the **Backend** service → **Variables**:
   - Set `FRONTEND_URL` to your frontend's Railway domain (e.g., `https://frontend-xxx.up.railway.app`)
2. Trigger a redeploy on both services

### 6. Configure Supabase Redirect URLs

1. In your Supabase Dashboard → **Authentication → URL Configuration**
2. Add your Railway frontend URL to **Redirect URLs**:
   ```
   https://frontend-xxx.up.railway.app/**
   ```
3. Set **Site URL** to your Railway frontend URL

---

## 📁 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all apps in development mode |
| `npm run build` | Build all apps |
| `npm run dev:frontend` | Start only the frontend |
| `npm run dev:backend` | Start only the backend |
| `npm run build:frontend` | Build only the frontend |
| `npm run build:backend` | Build only the backend |

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Backend**: Express.js, TypeScript
- **Auth & DB**: Supabase (Auth + PostgreSQL)
- **Monorepo**: Turborepo + npm workspaces
- **Deployment**: Railway
