This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 📂 Project Organization

This project is organized to clearly separate **Frontend** (UI) and **Backend** (server logic) code:

- **Frontend**: Pages and UI components in `app/[page-name]/`
- **Backend**: API routes in `app/api/`, server actions in `app/actions/`, and utilities in `backend/`

### 📚 Documentation

- **[ORGANIZATION_GUIDE.md](./ORGANIZATION_GUIDE.md)** - Complete guide to project organization
- **[DIRECTORY_TREE.md](./DIRECTORY_TREE.md)** - Visual directory tree
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Detailed structure documentation

### 🔍 Quick Reference

| Working on... | Look in... |
|---------------|------------|
| UI Pages | `app/[page-name]/page.tsx` |
| API Endpoints | `app/api/[endpoint]/route.ts` |
| Server Actions | `app/actions/[action].ts` |
| Database | `backend/database/` |
| Backend Utils | `backend/lib/` |

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
