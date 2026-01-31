# Import Path Updates Guide

After reorganizing the project, you need to update import paths in your files. This guide shows what needs to be changed.

## 🔄 Import Path Changes

### 1. API Route Imports

**Before:**
```typescript
import { ... } from '@/app/api/...'
```

**After:**
```typescript
import { ... } from '@/backend/api/...'
```

### 2. Server Actions Imports

**Before:**
```typescript
import { getWeather } from '@/app/actions/getWeather'
import { calculateWater } from '@/app/actions/waterCalculator'
```

**After:**
```typescript
import { getWeather } from '@/backend/actions/getWeather'
import { calculateWater } from '@/backend/actions/waterCalculator'
```

### 3. Backend Library Imports

**Before:**
```typescript
import { auth } from '@/lib/auth'
import { irrigation } from '@/lib/irrigation'
```

**After:**
```typescript
import { auth } from '@/backend/lib/auth'
import { irrigation } from '@/backend/lib/irrigation'
```

## 📝 Files That Need Updates

### Frontend Pages (in `app/`)

1. **app/weather/page.tsx**
   - Update: `import { getWeather } from '@/app/actions/getWeather'`
   - To: `import { getWeather } from '@/backend/actions/getWeather'`

2. **app/water-calculator/page.tsx**
   - Update: `import { calculateWater } from '@/app/actions/waterCalculator'`
   - To: `import { calculateWater } from '@/backend/actions/waterCalculator'`

3. **app/dashboard/page.tsx**
   - Update: `import { getWeather } from '@/app/actions/getWeather'`
   - To: `import { getWeather } from '@/backend/actions/getWeather'`

4. **app/irrigation/page.tsx**
   - Update any imports from `@/lib/irrigation`
   - To: `@/backend/lib/irrigation`

5. **app/login/page.tsx** & **app/signup/page.tsx**
   - Update: `import { auth } from '@/lib/auth'`
   - To: `import { auth } from '@/backend/lib/auth'`

### Backend Files

6. **backend/api/*/route.ts** (all API routes)
   - Update: `import { auth } from '@/lib/auth'`
   - To: `import { auth } from '@/backend/lib/auth'`
   - Update: `import { irrigation } from '@/lib/irrigation'`
   - To: `import { irrigation } from '@/backend/lib/irrigation'`

## 🔍 How to Find All Import References

Run this command to find all files that import from the old paths:

```powershell
# Find files importing from old app/actions path
Get-ChildItem -Recurse -Include *.ts,*.tsx | Select-String "@/app/actions" | Select-Object Path, LineNumber, Line

# Find files importing from old lib path (that should use backend/lib)
Get-ChildItem -Recurse -Include *.ts,*.tsx | Select-String "@/lib/(auth|irrigation)" | Select-Object Path, LineNumber, Line
```

## ⚙️ Update tsconfig.json (if needed)

Make sure your `tsconfig.json` has the correct path mappings:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

This allows `@/backend/...` and `@/app/...` to work correctly.

## ✅ Testing After Updates

After updating all imports:

1. **Stop the dev server** (if running)
2. **Clear Next.js cache**: `Remove-Item -Recurse -Force .next`
3. **Restart dev server**: `npm run dev`
4. **Check for errors** in the terminal
5. **Test all pages** to ensure they load correctly

## 🚨 Common Issues

### Issue: "Module not found"
- **Cause**: Import path not updated correctly
- **Fix**: Double-check the import path matches the new file location

### Issue: "Cannot find module '@/backend/...'"
- **Cause**: TypeScript path mapping issue
- **Fix**: Restart your IDE/editor and the dev server

### Issue: API routes not working
- **Cause**: Next.js expects API routes in `app/api/`
- **Fix**: We need to keep API routes in `app/api/` OR create a proxy

## 📌 Important Note About API Routes

**Next.js requires API routes to be in `app/api/` for the App Router.**

We have two options:

### Option A: Keep API routes in app/api (Recommended for Next.js)
- Keep the folder structure as Next.js expects
- Add clear comments in each API file indicating it's backend code
- Document in PROJECT_STRUCTURE.md that `app/api/` contains backend code

### Option B: Use a custom server (Advanced)
- Move API routes to `backend/api/`
- Set up a custom Next.js server
- More complex but provides complete separation

**Recommendation**: Use Option A for simplicity. The current Next.js structure is designed to have API routes in `app/api/`, and fighting this convention may cause more confusion.

## 🎯 Simplified Approach

Given Next.js conventions, here's the recommended structure:

```
app/
├── api/              # ⚠️ BACKEND - API Routes (Next.js requirement)
├── actions/          # ⚠️ BACKEND - Server Actions (Next.js convention)
├── dashboard/        # ✅ FRONTEND - Dashboard page
├── login/            # ✅ FRONTEND - Login page
└── ...               # ✅ FRONTEND - Other pages

backend/
├── database/         # ⚠️ BACKEND - Database scripts
└── lib/              # ⚠️ BACKEND - Utilities

lib/                  # 🔄 SHARED - Used by both frontend & backend
```

This maintains Next.js conventions while still providing clear organization through documentation and comments.
