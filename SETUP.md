# Setup Guide

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/fmspathankot-spec/fastapi-frontend.git
cd fastapi-frontend
npm install
```

### 2. Environment Setup

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Connecting to Your FastAPI Backend

### Update API URL

In `.env.local`, set your FastAPI backend URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### CORS Configuration

Ensure your FastAPI backend allows requests from the frontend:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Project Structure

```
fastapi-frontend/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # Reusable components
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilities
│   └── types/           # TypeScript types
├── public/              # Static assets
└── package.json
```

## Key Files to Customize

### 1. API Client (`src/lib/api-client.ts`)
- Configure base URL
- Add authentication headers
- Handle error responses

### 2. Custom Hooks (`src/hooks/use-api.ts`)
- Modify query/mutation behavior
- Add custom error handling
- Configure cache settings

### 3. Types (`src/types/index.ts`)
- Define your data models
- Match your FastAPI schemas

## Common Tasks

### Add a New Page

1. Create file in `src/app/your-page/page.tsx`
2. Add to navigation in `src/components/Navbar.tsx`

### Create a New API Hook

```typescript
export function useYourData() {
  return useGet<YourType>(
    ["your-key"],
    "/api/your-endpoint"
  );
}
```

### Add Form Validation

```typescript
const schema = z.object({
  field: z.string().min(1, "Required"),
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Build for Production

```bash
npm run build
npm start
```

## Troubleshooting

### CORS Errors
- Check FastAPI CORS middleware
- Verify API URL in `.env.local`

### API Connection Issues
- Ensure FastAPI is running
- Check network tab in browser DevTools
- Verify endpoint URLs

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## Next Steps

1. Customize the UI components
2. Add authentication
3. Connect to your FastAPI endpoints
4. Deploy to production

## Support

- [Next.js Docs](https://nextjs.org/docs)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [React Hook Form Docs](https://react-hook-form.com/)
