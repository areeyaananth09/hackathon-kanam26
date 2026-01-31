# ⚙️ BACKEND - API Routes

This directory contains all API endpoints for the application.

## 🔌 API Endpoints

### Authentication (`auth/`)
- User login, signup, and session management

### User Management (`user/`)
- User profile and account operations

### Irrigation Control (`irrigation/`)
- Control and monitor irrigation systems
- Get irrigation status and history

### Crop Growth (`crop-growth/`)
- Track crop growth and development

### Analytics (`growth-analytics/`)
- Growth analytics and insights

### Setup (`setup/`)
- Initial application setup

## 📝 Creating New API Routes

To create a new API endpoint:

1. Create a new folder: `app/api/[endpoint-name]/`
2. Add a `route.ts` file with handlers:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Handle GET request
  return NextResponse.json({ data: 'response' });
}

export async function POST(request: NextRequest) {
  // Handle POST request
  const body = await request.json();
  return NextResponse.json({ success: true });
}
```

## 🔒 Authentication

Most API routes require authentication. Use the auth utility:

```typescript
import { auth } from '@/backend/lib/auth';

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Handle authenticated request
}
```

## 📚 Documentation

- See `ORGANIZATION_GUIDE.md` for overall project structure
- See individual route files for specific endpoint documentation
