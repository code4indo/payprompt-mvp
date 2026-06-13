# PayPrompt — Deployment Guide

## 🚀 Deploy ke Vercel (Public URL)

### Langkah 1: Buat Repository di GitHub

1. Buka [github.com/new](https://github.com/new)
2. Nama repository: `payprompt`
3. Pilih **Public** atau **Private**
4. Klik **Create repository**

### Langkah 2: Upload Code ke GitHub

```bash
# Di terminal lokal Anda (bukan sandbox):

# 1. Download ZIP PayPrompt dari link yang diberikan
# 2. Extract ZIP

# 3. Masuk ke folder project
cd payprompt_mvp

# 4. Init git
git init

# 5. Add semua file
git add .

# 6. Commit
git commit -m "Initial PayPrompt MVP"

# 7. Connect ke GitHub repo
git remote add origin https://github.com/jatnikonm/payprompt.git

# 8. Push ke main branch
git push -u origin main
```

### Langkah 3: Setup Vercel Account

1. Buka [vercel.com](https://vercel.com)
2. Sign up dengan **GitHub account**
3. Klik **New Project**
4. Import repository `payprompt`
5. Framework preset: **Next.js** (auto-detect)
6. Klik **Deploy**

### Langkah 4: Dapatkan Public URL

Setelah deploy berhasil:
- **Production URL:** `https://payprompt.vercel.app`
- **Dashboard:** `https://payprompt.vercel.app/dashboard`

### Langkah 5: Setup GitHub Actions (Auto Deploy)

Agar setiap push ke GitHub otomatis deploy ke Vercel:

#### 5a. Generate Vercel Token
1. Buka [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Klik **Create Token**
3. Nama: `GitHub Actions Deploy`
4. Scope: **Full Account**
5. Copy token yang dihasilkan

#### 5b. Dapatkan Org ID & Project ID
```bash
# Di terminal lokal (setelah vercel link):
cat .vercel/project.json
```

Output:
```json
{
  "orgId": "team_xxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxx"
}
```

#### 5c. Tambahkan GitHub Secrets
1. Buka GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Klik **New repository secret**
3. Tambahkan 3 secrets:

| Secret Name | Value |
|-------------|-------|
| `VERCEL_TOKEN` | Token dari Step 5a |
| `VERCEL_ORG_ID` | `orgId` dari Step 5b |
| `VERCEL_PROJECT_ID` | `projectId` dari Step 5b |

### Langkah 6: Test Auto Deploy

```bash
# Buat perubahan kecil
echo "# PayPrompt Live" >> README.md

# Commit & push
git add .
git commit -m "Test auto deploy"
git push origin main
```

Buka GitHub repo → **Actions** tab → Lihat workflow berjalan → Deploy otomatis ke Vercel!

---

## 📋 Checklist Pre-Deploy

- [ ] Semua file code sudah di-push ke GitHub
- [ ] Vercel account sudah terhubung dengan GitHub
- [ ] Project sudah di-import di Vercel dashboard
- [ ] GitHub Actions workflow file sudah ada (`.github/workflows/deploy.yml`)
- [ ] 3 GitHub Secrets sudah ditambahkan
- [ ] `vercel.json` sudah ada di root project

---

## 🔧 Troubleshooting

### Error: "Cannot find module"
```bash
# Pastikan node_modules tidak di-push
git rm -r --cached node_modules
git commit -m "Remove node_modules"
git push origin main
```

### Error: "Build failed"
1. Cek Vercel dashboard → **Deployments** → **Logs**
2. Pastikan `package.json` valid
3. Pastikan `next.config.js` tidak ada error

### Error: "VERCEL_TOKEN not found"
- Pastikan secret name persis: `VERCEL_TOKEN` (case sensitive)
- Pastikan token belum expired di Vercel

---

## 🌐 Custom Domain (Opsional)

1. Buka Vercel dashboard → Project → **Domains**
2. Klik **Add**
3. Masukkan domain: `payprompt.yourdomain.com`
4. Ikuti instruksi DNS

---

## 📞 Support

- Email: founder@payprompt.io
- GitHub Issues: [github.com/jatnikonm/payprompt/issues](https://github.com/jatnikonm/payprompt/issues)
