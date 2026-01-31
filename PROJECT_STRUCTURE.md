# Project Structure

This document explains the organization of the hackathon-kanam26 project.

## Directory Structure

```
hackathon-kanam26/
│
├── 📁 app/                          # FRONTEND - Next.js App Router Pages
│   ├── dashboard/                   # Dashboard page
│   ├── login/                       # Login page
│   ├── signup/                      # Signup page
│   ├── onboarding/                  # Onboarding page
│   ├── profile/                     # Profile page
│   ├── settings/                    # Settings page
│   ├── weather/                     # Weather page
│   ├── water-calculator/            # Water calculator page
│   ├── irrigation/                  # Irrigation control page
│   ├── schedule/                    # Schedule page
│   ├── history/                     # History page
│   ├── analytics/                   # Analytics page
│   ├── help/                        # Help page
│   ├── privacy/                     # Privacy policy page
│   ├── terms/                       # Terms of service page
│   ├── how-it-works/                # How it works page
│   ├── forgot-password/             # Forgot password page
│   ├── context/                     # React Context providers (LanguageContext)
│   ├── page.tsx                     # Homepage (Get Started)
│   ├── layout.tsx                   # Root layout
│   └── globals.css                  # Global styles
│
├── 📁 backend/                      # BACKEND - All Server-Side Code
│   ├── 📁 api/                      # API Routes (Next.js API handlers)
│   │   ├── auth/                    # Authentication endpoints
│   │   ├── user/                    # User management endpoints
│   │   ├── irrigation/              # Irrigation control endpoints
│   │   ├── crop-growth/             # Crop growth endpoints
│   │   ├── growth-analytics/        # Analytics endpoints
│   │   └── setup/                   # Setup endpoints
│   │
│   ├── 📁 actions/                  # Server Actions
│   │   ├── getWeather.ts            # Weather data fetching
│   │   └── waterCalculator.ts       # Water calculation logic
│   │
│   ├── 📁 database/                 # Database Scripts & Schema
│   │   ├── application_schema.sql   # Database schema
│   │   ├── check-tables.js          # Table verification script
│   │   ├── fix-logs-table.js        # Database migration script
│   │   └── migrate.js               # Migration runner
│   │
│   └── 📁 lib/                      # Backend Utilities
│       ├── auth.ts                  # Authentication logic
│       ├── auth-client.ts           # Auth client utilities
│       └── irrigation.ts            # Irrigation utilities
│
├── 📁 components/                   # FRONTEND - Reusable UI Components
│   └── (Future: Extract reusable components here)
│
├── 📁 lib/                          # Shared Utilities (Frontend & Backend)
│   └── (Shared code that both frontend and backend use)
│
├── 📁 public/                       # Static Assets
│   ├── images/                      # Images
│   └── icons/                       # Icons
│
├── 📁 .next/                        # Next.js build output (auto-generated)
├── 📁 node_modules/                 # Dependencies (auto-generated)
│
├── .env.local                       # Environment variables
├── .gitignore                       # Git ignore rules
├── package.json                     # Project dependencies
├── tsconfig.json                    # TypeScript configuration
├── next.config.ts                   # Next.js configuration
└── README.md                        # Project documentation
```

## File Organization Guidelines

### Frontend Files (in `app/`)
- **Pages**: Each route has its own folder with a `page.tsx` file
- **Layouts**: Shared layouts using `layout.tsx`
- **Context**: React Context providers in `app/context/`
- **Styles**: Global styles in `app/globals.css`

### Backend Files (in `backend/`)
- **API Routes**: RESTful endpoints in `backend/api/`
- **Server Actions**: Next.js server actions in `backend/actions/`
- **Database**: Schema and migration scripts in `backend/database/`
- **Utilities**: Backend-specific utilities in `backend/lib/`

### Shared Files
- **lib/**: Code used by both frontend and backend
- **public/**: Static assets accessible from the web

## Key Features by Directory

### Frontend Pages
- **Homepage** (`app/page.tsx`): Landing page with language selection
- **Dashboard** (`app/dashboard/`): Main user dashboard
- **Authentication** (`app/login/`, `app/signup/`): User authentication
- **Onboarding** (`app/onboarding/`): New user setup
- **Weather** (`app/weather/`): Weather information
- **Water Calculator** (`app/water-calculator/`): AI-powered water calculation
- **Irrigation** (`app/irrigation/`): Irrigation control system
- **Profile & Settings** (`app/profile/`, `app/settings/`): User management

### Backend Services
- **Authentication API** (`backend/api/auth/`): Login, signup, session management
- **User API** (`backend/api/user/`): User profile and data
- **Irrigation API** (`backend/api/irrigation/`): Irrigation control and monitoring
- **Weather Actions** (`backend/actions/getWeather.ts`): Fetch weather data
- **Water Calculator** (`backend/actions/waterCalculator.ts`): Calculate optimal water usage

## Development Workflow

1. **Frontend Development**: Work in `app/` directory for UI changes
2. **Backend Development**: Work in `backend/` directory for API and server logic
3. **Database Changes**: Update schema in `backend/database/application_schema.sql`
4. **Shared Code**: Place in `lib/` if used by both frontend and backend

## Notes

- The `app/api/` folder should be moved to `backend/api/` (requires stopping dev server)
- The `app/actions/` folder has been moved to `backend/actions/`
- Database scripts have been moved to `backend/database/`
- This structure maintains Next.js conventions while providing clear separation
