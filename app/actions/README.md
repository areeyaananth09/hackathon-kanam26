# ⚙️ BACKEND - Server Actions

This directory contains Next.js server actions for server-side operations.

## 🎯 Available Actions

### `getWeather.ts`
Fetches weather data based on location.

**Usage:**
```typescript
import { getWeather } from '@/app/actions/getWeather';

const weather = await getWeather(latitude, longitude);
```

### `waterCalculator.ts`
Calculates optimal water requirements based on crop, soil, and weather.

**Usage:**
```typescript
import { calculateWater } from '@/app/actions/waterCalculator';

const waterNeeds = await calculateWater({
  cropType: 'wheat',
  soilType: 'clay',
  location: { lat, lon }
});
```

## 📝 Creating New Server Actions

Server actions are async functions that run on the server:

```typescript
'use server';

export async function myAction(data: any) {
  // Server-side logic here
  return result;
}
```

## 🔒 Authentication

Server actions can access the session:

```typescript
'use server';

import { auth } from '@/backend/lib/auth';

export async function myAction() {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }
  // Handle authenticated action
}
```

## 📚 Documentation

- See `ORGANIZATION_GUIDE.md` for overall project structure
- Server actions are backend code that runs on the server
