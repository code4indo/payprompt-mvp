# PayPrompt MVP — Vercel Deployment Guide

## Prasyarat
1. Akun Vercel (https://vercel.com)
2. Akun GitHub (sudah ada: code4indo/payprompt-mvp)
3. Database PostgreSQL (pilih salah satu):
   - **Vercel Postgres** (rekomendasi, gratis di Vercel dashboard)
   - **Neon** (https://neon.tech — gratis)
   - **Supabase** (https://supabase.com — gratis)

## Langkah Deploy

### 1. Buat Database PostgreSQL
Buka Vercel Dashboard → Project → Storage → Create Database → Postgres

Atau buat database gratis di:
- Neon: https://console.neon.tech → New Project
- Supabase: https://supabase.com → New Project

Salin connection string, contoh:
```
postgresql://user:password@ep-xxx.region.aws.neon.tech/payprompt?sslmode=require
```

### 2. Ubah Prisma Schema untuk PostgreSQL
Ganti `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### 3. Set Environment Variables di Vercel
Buka Vercel Dashboard → Project → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `postgresql://user:pass@host/db?sslmode=require` |
| `DIRECT_URL` | `postgresql://user:pass@host/db?sslmode=require` |
| `NEXTAUTH_SECRET` | Generate: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://paypromptmvp.vercel.app` |

### 4. Push Schema ke Database
Jalankan lokal:
```bash
npx prisma db push
```

### 5. Deploy
```bash
git push origin main
```
Atau manual:
```bash
vercel --prod
```

## Fitur yang Sudah Berjalan
- ✅ Halaman Landing (Hero, Features, Pricing, dll)
- ✅ Signup / Registrasi Akun
- ✅ Login / Masuk
- ✅ Logout
- ✅ Lupa Password & Reset Password
- ✅ Proteksi Route Dashboard
- ✅ Dashboard dengan data mock
- ✅ Bahasa Indonesia untuk halaman auth

## Catatan
- **SQLite** hanya untuk pengembangan lokal
- **PostgreSQL** wajib untuk deployment Vercel (serverless)
- NEXTAUTH_SECRET harus minimal 32 karakter di production
