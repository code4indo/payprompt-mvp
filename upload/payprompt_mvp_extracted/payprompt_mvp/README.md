# PayPrompt — AI Invoice Reminder Automation

## 🚀 MVP Prototype

PayPrompt is an AI-powered invoice reminder tool designed for freelancers and small agencies. It reduces Days Sales Outstanding (DSO) by 40% through intelligent, automated follow-ups.

## 📁 Project Structure

```
payprompt_mvp/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── components/                  # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── HowItWorks.tsx
│   ├── Stats.tsx
│   ├── Testimonials.tsx
│   ├── Pricing.tsx
│   ├── CTA.tsx
│   └── Footer.tsx
├── pages/                       # Next.js pages
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx               # Landing page
│   └── dashboard.tsx           # MVP Dashboard
├── styles/
│   └── globals.css              # Tailwind + custom styles
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── vercel.json                  # Vercel deployment config
├── .gitignore
├── LANDING_PAGE_COPY.md         # Marketing copy
├── PITCH_DECK.md                # Investor pitch deck
├── DEPLOYMENT_GUIDE.md          # Step-by-step deploy guide
└── README.md                    # This file
```

## 🛠 Tech Stack

- **Framework:** Next.js 15 + React 19
- **Styling:** Tailwind CSS 3.4
- **Language:** TypeScript
- **Icons:** Lucide React
- **Animation:** Framer Motion
- **Charts:** Recharts

## 🚀 Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🌐 Deploy ke Vercel (Public URL)

Lihat **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** untuk panduan lengkap.

**Ringkasan cepat:**
1. Push code ke GitHub
2. Import repo di [vercel.com](https://vercel.com)
3. Dapatkan URL: `https://payprompt.vercel.app`

## 📄 Key Documents

| Dokumen | Deskripsi |
|---------|-----------|
| `LANDING_PAGE_COPY.md` | Copywriting lengkap landing page |
| `PITCH_DECK.md` | 13-slide investor deck + appendix |
| `DEPLOYMENT_GUIDE.md` | Panduan deploy step-by-step |

## 🎯 Business Model

| Tier | Harga | Target |
|------|-------|--------|
| Free | $0 | Acquisition |
| Pro | $19/mo | Freelancers |
| Agency | $49/mo | Teams (5 users) |
| Enterprise | $99/mo | Custom |

**Unit Economics:**
- CAC: $20
- LTV: $571
- LTV/CAC: 28.5x
- Gross Margin: 87%

## 📊 Proyeksi Finansial

| Tahun | Users | MRR | ARR | Cumulative Profit |
|-------|-------|-----|-----|-------------------|
| 1 | 1,200 | $22,800 | $273,600 | -$2,280 |
| 2 | 6,000 | $114,000 | $1,368,000 | $302,220 |
| 3 | 12,000 | $228,000 | $2,736,000 | $1,166,220 |

## 🔐 Security

- SOC 2 Type II certified (in progress)
- AES-256 encryption at rest
- TLS 1.3 in transit
- GDPR compliant
- No payment credentials stored

## 🤝 Contributing

1. Fork repository
2. Create branch: `git checkout -b feature/nama-fitur`
3. Commit: `git commit -m "Add: deskripsi fitur"`
4. Push: `git push origin feature/nama-fitur`
5. Buat Pull Request

## 📞 Contact

- Email: founder@payprompt.io
- Website: [payprompt.vercel.app](https://payprompt.vercel.app)
- Twitter: [@payprompt](https://twitter.com/payprompt)

---

Built with ❤️ for freelancers who deserve to get paid on time.
