# 🎯 Quick Navigation Guide

## 📱 FRONTEND (What Users See)

### Pages - Located in `app/`

```
app/
├── page.tsx                    ← 🏠 Homepage (Get Started)
├── dashboard/page.tsx          ← 📊 Dashboard
├── login/page.tsx              ← 🔐 Login
├── signup/page.tsx             ← ✍️ Signup
├── onboarding/page.tsx         ← 🚀 Onboarding
├── profile/page.tsx            ← 👤 Profile
├── settings/page.tsx           ← ⚙️ Settings
├── weather/page.tsx            ← 🌤️ Weather
├── water-calculator/page.tsx   ← 💧 Water Calculator
├── irrigation/page.tsx         ← 🚿 Irrigation Control
├── schedule/page.tsx           ← 📅 Schedule
├── history/page.tsx            ← 📜 History
├── analytics/page.tsx          ← 📈 Analytics
├── help/page.tsx               ← ❓ Help
├── privacy/page.tsx            ← 🔒 Privacy Policy
├── terms/page.tsx              ← 📄 Terms of Service
├── how-it-works/page.tsx       ← 💡 How It Works
└── forgot-password/page.tsx    ← 🔑 Password Recovery
```

### Context - Located in `app/context/`

```
app/context/
└── LanguageContext.tsx         ← 🌍 Multi-language support
```

---

## ⚙️ BACKEND (Server Logic)

### API Routes - Located in `app/api/`

```
app/api/                        ← ⚠️ BACKEND CODE
├── auth/                       ← 🔐 Authentication API
├── user/                       ← 👤 User Management API
├── irrigation/                 ← 🚿 Irrigation Control API
├── crop-growth/                ← 🌱 Crop Tracking API
├── growth-analytics/           ← 📊 Analytics API
└── setup/                      ← ⚙️ Setup API
```

### Server Actions - Located in `backend/actions/`

```
backend/actions/                ← ⚠️ BACKEND CODE
├── getWeather.ts               ← 🌤️ Fetch weather data
└── getFarmDetails.ts           ← 🏡 Get farm information
```

### Database - Located in `backend/database/`

```
backend/database/               ← ⚠️ BACKEND CODE
├── application_schema.sql      ← 💾 Database schema
├── migrate.js                  ← 🔄 Run migrations
├── check-tables.js             ← ✅ Verify tables
└── fix-logs-table.js           ← 🔧 Fix logs table
```

### Backend Utilities - Located in `backend/lib/`

```
backend/lib/                    ← ⚠️ BACKEND CODE
├── auth.ts                     ← 🔐 Authentication logic
├── auth-client.ts              ← 🔐 Auth client
└── irrigation.ts               ← 🚿 Irrigation utilities
```

---

## 🔍 Quick Find Table

| I want to... | Go to... |
|--------------|----------|
| Edit a page UI | `app/[page-name]/page.tsx` |
| Add an API endpoint | `app/api/[endpoint]/route.ts` |
| Add server logic | `backend/actions/[action].ts` |
| Update database | `backend/database/application_schema.sql` |
| Modify auth | `backend/lib/auth.ts` |
| Change styles | `app/globals.css` |
| Update translations | `app/context/LanguageContext.tsx` |

---

## 🎨 Color Code

- 📱 = **Frontend** (runs in browser)
- ⚙️ = **Backend** (runs on server)
- 🏠 = Homepage
- 🔐 = Authentication
- 💧 = Water/Irrigation
- 🌤️ = Weather
- 📊 = Dashboard/Analytics
- 💾 = Database
- 🌍 = Internationalization

---

## 💡 Remember

1. **Frontend** = Files that create the user interface
   - Located in: `app/[page-name]/page.tsx`
   - These are what users see and interact with

2. **Backend** = Files that handle server logic
   - API Routes: `app/api/`
   - Server Actions: `backend/actions/`
   - Database: `backend/database/`
   - Utilities: `backend/lib/`

3. **API routes stay in `app/api/`** because Next.js requires it
   - But they are clearly marked as BACKEND code
   - README files explain this

---

## 📚 Full Documentation

For complete details, see:
- **[ORGANIZATION_GUIDE.md](./ORGANIZATION_GUIDE.md)** - Complete guide
- **[DIRECTORY_TREE.md](./DIRECTORY_TREE.md)** - Visual tree
- **[REORGANIZATION_COMPLETE.md](./REORGANIZATION_COMPLETE.md)** - What changed

---

**No more confusion! Frontend and Backend are now clearly separated!** 🎉
