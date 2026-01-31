# 🗂️ Project Organization Guide

This project separates **Frontend** and **Backend** code while maintaining Next.js conventions.

## 📂 Directory Structure

```
hackathon-kanam26/
│
├── 📱 FRONTEND (User Interface)
│   ├── app/
│   │   ├── dashboard/              # Dashboard page
│   │   ├── login/                  # Login page
│   │   ├── signup/                 # Signup page
│   │   ├── onboarding/             # Onboarding page
│   │   ├── profile/                # Profile page
│   │   ├── settings/               # Settings page
│   │   ├── weather/                # Weather page
│   │   ├── water-calculator/       # Water calculator page
│   │   ├── irrigation/             # Irrigation control page
│   │   ├── schedule/               # Schedule page
│   │   ├── history/                # History page
│   │   ├── analytics/              # Analytics page
│   │   ├── help/                   # Help page
│   │   ├── privacy/                # Privacy policy
│   │   ├── terms/                  # Terms of service
│   │   ├── how-it-works/           # How it works
│   │   ├── forgot-password/        # Password recovery
│   │   ├── context/                # React Context (Language, Theme)
│   │   ├── page.tsx                # 🏠 Homepage
│   │   ├── layout.tsx              # Root layout
│   │   └── globals.css             # Global styles
│   │
│   ├── components/                 # Reusable UI components
│   └── public/                     # Static assets (images, icons)
│
├── ⚙️ BACKEND (Server-Side Logic)
│   ├── app/
│   │   ├── api/                    # 🔌 API Routes
│   │   │   ├── auth/               # Authentication endpoints
│   │   │   ├── user/               # User management
│   │   │   ├── irrigation/         # Irrigation control
│   │   │   ├── crop-growth/        # Crop tracking
│   │   │   ├── growth-analytics/   # Analytics
│   │   │   └── setup/              # Initial setup
│   │   │
│   │   └── actions/                # 🎯 Server Actions
│   │       ├── getWeather.ts       # Fetch weather data
│   │       └── waterCalculator.ts  # Calculate water needs
│   │
│   ├── backend/
│   │   ├── database/               # 💾 Database
│   │   │   ├── application_schema.sql  # Database schema
│   │   │   ├── check-tables.js     # Verify tables
│   │   │   ├── fix-logs-table.js   # Migration script
│   │   │   └── migrate.js          # Run migrations
│   │   │
│   │   └── lib/                    # 🛠️ Backend Utilities
│   │       ├── auth.ts             # Authentication logic
│   │       ├── auth-client.ts      # Auth client
│   │       └── irrigation.ts       # Irrigation utilities
│   │
│   └── lib/                        # 🔄 Shared Utilities
│       └── (Code used by both frontend & backend)
│
└── 📦 Configuration
    ├── .env.local                  # Environment variables
    ├── package.json                # Dependencies
    ├── tsconfig.json               # TypeScript config
    └── next.config.ts              # Next.js config
```

## 🎨 Frontend Files (User Interface)

### Pages (`app/**/page.tsx`)
All user-facing pages that render UI:
- Homepage, Dashboard, Login, Signup
- Weather, Water Calculator, Irrigation
- Profile, Settings, Help, etc.

### Components (`components/`)
Reusable UI components (buttons, cards, forms, etc.)

### Styles (`app/globals.css`)
Global CSS and styling

### Context (`app/context/`)
React Context providers (Language, Theme, etc.)

## ⚙️ Backend Files (Server Logic)

### API Routes (`app/api/**/route.ts`)
RESTful API endpoints that handle HTTP requests:
- `POST /api/auth/login` - User login
- `GET /api/user/profile` - Get user profile
- `POST /api/irrigation/control` - Control irrigation
- etc.

### Server Actions (`app/actions/*.ts`)
Next.js server actions for server-side operations:
- `getWeather()` - Fetch weather data
- `calculateWater()` - Calculate water requirements

### Database (`backend/database/`)
Database schema and migration scripts:
- `application_schema.sql` - Complete database schema
- `migrate.js` - Run database migrations
- `check-tables.js` - Verify database setup

### Backend Utilities (`backend/lib/`)
Server-side utility functions:
- `auth.ts` - Authentication helpers
- `irrigation.ts` - Irrigation logic

## 🔍 How to Find Files

### Working on Frontend (UI)?
Look in:
- `app/[page-name]/page.tsx` - Page components
- `app/context/` - Global state
- `components/` - Reusable components
- `app/globals.css` - Styles

### Working on Backend (API/Logic)?
Look in:
- `app/api/` - API endpoints
- `app/actions/` - Server actions
- `backend/database/` - Database
- `backend/lib/` - Utilities

## 📝 File Naming Conventions

### Frontend
- ✅ `page.tsx` - Page component
- ✅ `layout.tsx` - Layout component
- ✅ `ComponentName.tsx` - React component
- ✅ `styles.module.css` - Component styles

### Backend
- ✅ `route.ts` - API route handler
- ✅ `actionName.ts` - Server action
- ✅ `utility.ts` - Utility function
- ✅ `schema.sql` - Database schema

## 🚀 Quick Reference

| Task | Location |
|------|----------|
| Add new page | `app/[page-name]/page.tsx` |
| Add API endpoint | `app/api/[endpoint]/route.ts` |
| Add server action | `app/actions/[action].ts` |
| Update database | `backend/database/application_schema.sql` |
| Add UI component | `components/[Component].tsx` |
| Update styles | `app/globals.css` |
| Configure auth | `backend/lib/auth.ts` |

## 💡 Tips

1. **Frontend files** = Files that render UI and run in the browser
2. **Backend files** = Files that run on the server and handle data
3. **API routes** (`app/api/`) are backend even though they're in `app/`
4. **Server actions** (`app/actions/`) are backend even though they're in `app/`
5. This is a Next.js convention - we keep it for compatibility

## 🎯 Summary

- **Frontend**: `app/[pages]/`, `components/`, `public/`
- **Backend**: `app/api/`, `app/actions/`, `backend/`
- **Shared**: `lib/`

The structure maintains Next.js conventions while providing clear separation through organization and documentation.
