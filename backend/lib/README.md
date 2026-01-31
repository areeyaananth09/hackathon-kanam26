# ⚙️ BACKEND - Utilities

This directory contains backend utility functions and helpers.

## 🛠️ Available Utilities

### `auth.ts`
Authentication and authorization utilities.

**Functions:**
- Session management
- User authentication
- Permission checks

### `auth-client.ts`
Client-side authentication helpers.

### `irrigation.ts`
Irrigation system utilities.

**Functions:**
- Irrigation control logic
- Schedule management
- Water flow calculations

## 📝 Creating New Utilities

Backend utilities are reusable functions for server-side operations:

```typescript
export function myUtility(params: any) {
  // Utility logic
  return result;
}
```

## 🔒 Security

Backend utilities have access to:
- Database connections
- Environment variables
- Server-side APIs

Never expose sensitive operations to the client.

## 📚 Documentation

- See `ORGANIZATION_GUIDE.md` for overall project structure
- Backend utilities are server-side only
