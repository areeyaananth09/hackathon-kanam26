# ⚙️ BACKEND - Database

This directory contains database schema and migration scripts.

## 💾 Files

### `application_schema.sql`
Complete database schema for the application.

Contains tables for:
- Users and authentication
- Farm and crop data
- Irrigation control and logs
- Weather data
- Analytics

### `migrate.js`
Runs database migrations.

**Usage:**
```bash
node backend/database/migrate.js
```

### `check-tables.js`
Verifies that all required tables exist.

**Usage:**
```bash
node backend/database/check-tables.js
```

### `fix-logs-table.js`
Migration script to fix the logs table structure.

**Usage:**
```bash
node backend/database/fix-logs-table.js
```

## 🔧 Database Configuration

Database connection is configured via environment variables in `.env.local`:

```env
DATABASE_URL=your_database_url
```

## 📝 Making Schema Changes

1. Update `application_schema.sql` with new tables/columns
2. Create a migration script if needed
3. Run migrations: `node backend/database/migrate.js`
4. Verify: `node backend/database/check-tables.js`

## 📚 Documentation

- See `ORGANIZATION_GUIDE.md` for overall project structure
- Database files are backend code
