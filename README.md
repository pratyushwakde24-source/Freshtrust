# FreshTrust – India's Most Transparent Meat Delivery & Live Butcher Cam Platform

FreshTrust is a full-stack, enterprise-grade meat delivery marketplace platform featuring **Live Butcher Cam** WebRTC video streaming as its core USP. The platform supports 5 integrated portals (Customer App, Worker App, Shop Owner Dashboard, Delivery Partner App, and Super Admin Dashboard), an enterprise Next.js 15 App Router architecture, Prisma ORM with PostgreSQL, Redis caching, Socket.IO real-time engine, and Razorpay payment verification.

---

## Technical Stack & Architecture

- **Frontend Core**: Next.js 15, React 19, TypeScript, TailwindCSS, Zustand state management, Lucide React icons, Recharts data visualization.
- **Backend & APIs**: Next.js App Router API endpoints, TypeScript, Zod validation, JWT authentication, RBAC middleware.
- **Database & Storage**: PostgreSQL, Prisma ORM schema & migrations, Redis cache adapter.
- **Live Streaming & Real-time**: WebRTC live streaming engine, Socket.IO real-time order tracking & signaling server.
- **Payments & Security**: Razorpay SDK & HMAC-SHA256 signature verification, CSRF, security headers, rate limiting.
- **DevOps & Cloud**: Docker multi-stage containerization, Docker Compose (App, Postgres, Redis, Nginx), Nginx reverse proxy config, GitHub Actions CI/CD pipeline.

---

## Integrated Portals

1. **📱 Customer App**: Product catalog, custom cut configurator (Curry Cut, Biryani Cut, Boneless, Mince), WebRTC Live Butcher Cam viewer, cart & checkout, Razorpay payments, real-time rider tracking.
2. **🔪 Worker & Butcher App**: Order prep queue, WebRTC Live Stream broadcaster, canvas quality overlay, prep & packing checklist, packing stamp generator.
3. **🏬 Shop Owner Dashboard**: Real-time sales ticker, camera node health matrix, live stock inventory manager, worker shift tracking.
4. **🛵 Delivery Partner App**: Order dispatch board, map route navigation preview, pickup confirmation, customer delivery OTP verification.
5. **🛡️ Super Admin Dashboard**: Multi-city GMV breakdown, platform commission configuration, shop onboarding, system audit logs, RBAC governance.

---

## Quick Start & Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Database Migration & Seed
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

---

## Production Docker Deployment

To launch the full production environment with PostgreSQL, Redis, Next.js, and Nginx reverse proxy:
```bash
docker-compose up -d --build
```

---

## Verification & Testing

- Run TypeScript compiler verification:
  ```bash
  npx tsc --noEmit
  ```
- Build production bundle:
  ```bash
  npm run build
  ```
