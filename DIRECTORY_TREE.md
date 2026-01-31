# 📁 Project Directory Tree

```
hackathon-kanam26/
│
├── 📱 FRONTEND (User Interface - Browser)
│   │
│   ├── app/
│   │   ├── 📄 page.tsx                    ← Homepage (Get Started)
│   │   ├── 📄 layout.tsx                  ← Root layout
│   │   ├── 📄 globals.css                 ← Global styles
│   │   │
│   │   ├── context/                       ← React Context
│   │   │   └── 📄 LanguageContext.tsx     ← Multi-language support
│   │   │
│   │   ├── dashboard/
│   │   │   └── 📄 page.tsx                ← Dashboard page
│   │   │
│   │   ├── login/
│   │   │   └── 📄 page.tsx                ← Login page
│   │   │
│   │   ├── signup/
│   │   │   └── 📄 page.tsx                ← Signup page
│   │   │
│   │   ├── onboarding/
│   │   │   └── 📄 page.tsx                ← Onboarding page
│   │   │
│   │   ├── profile/
│   │   │   └── 📄 page.tsx                ← Profile page
│   │   │
│   │   ├── settings/
│   │   │   └── 📄 page.tsx                ← Settings page
│   │   │
│   │   ├── weather/
│   │   │   └── 📄 page.tsx                ← Weather page
│   │   │
│   │   ├── water-calculator/
│   │   │   └── 📄 page.tsx                ← Water calculator page
│   │   │
│   │   ├── irrigation/
│   │   │   └── 📄 page.tsx                ← Irrigation control page
│   │   │
│   │   ├── schedule/
│   │   │   └── 📄 page.tsx                ← Schedule page
│   │   │
│   │   ├── history/
│   │   │   └── 📄 page.tsx                ← History page
│   │   │
│   │   ├── analytics/
│   │   │   └── 📄 page.tsx                ← Analytics page
│   │   │
│   │   ├── help/
│   │   │   └── 📄 page.tsx                ← Help page
│   │   │
│   │   ├── privacy/
│   │   │   └── 📄 page.tsx                ← Privacy policy
│   │   │
│   │   ├── terms/
│   │   │   └── 📄 page.tsx                ← Terms of service
│   │   │
│   │   ├── how-it-works/
│   │   │   └── 📄 page.tsx                ← How it works
│   │   │
│   │   └── forgot-password/
│   │       └── 📄 page.tsx                ← Password recovery
│   │
│   ├── components/                        ← Reusable UI components
│   │   └── (Future components here)
│   │
│   └── public/                            ← Static assets
│       ├── images/
│       └── icons/
│
├── ⚙️ BACKEND (Server Logic - Server)
│   │
│   ├── app/
│   │   │
│   │   ├── api/                           ← 🔌 API ROUTES (Backend)
│   │   │   ├── 📄 README.md              ← API documentation
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   └── 📄 route.ts           ← Authentication API
│   │   │   │
│   │   │   ├── user/
│   │   │   │   └── 📄 route.ts           ← User management API
│   │   │   │
│   │   │   ├── irrigation/
│   │   │   │   ├── 📄 route.ts           ← Irrigation API
│   │   │   │   ├── control/
│   │   │   │   ├── status/
│   │   │   │   └── history/
│   │   │   │
│   │   │   ├── crop-growth/
│   │   │   │   └── 📄 route.ts           ← Crop tracking API
│   │   │   │
│   │   │   ├── growth-analytics/
│   │   │   │   └── 📄 route.ts           ← Analytics API
│   │   │   │
│   │   │   └── setup/
│   │   │       └── 📄 route.ts           ← Setup API
│   │   │
│   │   └── actions/                       ← 🎯 SERVER ACTIONS (Backend)
│   │       ├── 📄 README.md              ← Actions documentation
│   │       ├── 📄 getWeather.ts          ← Fetch weather data
│   │       └── 📄 waterCalculator.ts     ← Calculate water needs
│   │
│   ├── backend/
│   │   │
│   │   ├── database/                      ← 💾 DATABASE
│   │   │   ├── 📄 README.md              ← Database documentation
│   │   │   ├── 📄 application_schema.sql ← Database schema
│   │   │   ├── 📄 migrate.js             ← Run migrations
│   │   │   ├── 📄 check-tables.js        ← Verify tables
│   │   │   └── 📄 fix-logs-table.js      ← Fix logs table
│   │   │
│   │   └── lib/                           ← 🛠️ BACKEND UTILITIES
│   │       ├── 📄 README.md              ← Utilities documentation
│   │       ├── 📄 auth.ts                ← Authentication logic
│   │       ├── 📄 auth-client.ts         ← Auth client
│   │       └── 📄 irrigation.ts          ← Irrigation utilities
│   │
│   └── lib/                               ← 🔄 SHARED UTILITIES
│       └── (Shared between frontend & backend)
│
├── 📦 CONFIGURATION
│   ├── 📄 .env.local                      ← Environment variables
│   ├── 📄 package.json                    ← Dependencies
│   ├── 📄 tsconfig.json                   ← TypeScript config
│   ├── 📄 next.config.ts                  ← Next.js config
│   ├── 📄 eslint.config.mjs               ← ESLint config
│   └── 📄 postcss.config.mjs              ← PostCSS config
│
├── 📚 DOCUMENTATION
│   ├── 📄 README.md                       ← Project README
│   ├── 📄 ORGANIZATION_GUIDE.md           ← This guide (main reference)
│   ├── 📄 PROJECT_STRUCTURE.md            ← Detailed structure
│   └── 📄 DIRECTORY_TREE.md               ← This file
│
└── 🔧 BUILD OUTPUT (Auto-generated)
    ├── .next/                             ← Next.js build
    └── node_modules/                      ← Dependencies
```

## 🎨 Legend

- 📱 = Frontend (runs in browser)
- ⚙️ = Backend (runs on server)
- 🔌 = API Routes
- 🎯 = Server Actions
- 💾 = Database
- 🛠️ = Utilities
- 🔄 = Shared
- 📦 = Configuration
- 📚 = Documentation
- 🔧 = Auto-generated

## 🔍 Quick Find

| Looking for... | Go to... |
|----------------|----------|
| A page (UI) | `app/[page-name]/page.tsx` |
| API endpoint | `app/api/[endpoint]/route.ts` |
| Server action | `app/actions/[action].ts` |
| Database schema | `backend/database/application_schema.sql` |
| Auth logic | `backend/lib/auth.ts` |
| Styles | `app/globals.css` |
| Language translations | `app/context/LanguageContext.tsx` |

## 📝 Notes

- **Frontend** = Files in `app/` that are pages, layouts, or components
- **Backend** = Files in `app/api/`, `app/actions/`, and `backend/`
- Next.js requires API routes in `app/api/` - this is a framework convention
- Server actions in `app/actions/` are also backend despite being in `app/`
- README files in each directory provide specific guidance

## 🚀 Getting Started

1. **Frontend work?** → Look in `app/[page-name]/`
2. **Backend work?** → Look in `app/api/` or `backend/`
3. **Database work?** → Look in `backend/database/`
4. **Not sure?** → Check `ORGANIZATION_GUIDE.md`
