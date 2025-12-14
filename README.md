# FastAPI Frontend

Modern Next.js 16 frontend with TanStack Query, React Hook Form, and Tailwind CSS for FastAPI backend.

## 🚀 Features

- **Next.js 16** - Latest React framework with App Router
- **TanStack Query v5** - Powerful data fetching and caching
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Full type safety
- **Axios** - HTTP client with interceptors
- **Sonner** - Beautiful toast notifications
- **Lucide Icons** - Modern icon library

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/fmspathankot-spec/fastapi-frontend.git
cd fastapi-frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Start development server
npm run dev
```

## 🔧 Configuration

Edit `.env.local` to configure your API endpoint:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Homepage
│   ├── providers.tsx      # TanStack Query setup
│   ├── forms/             # Form examples
│   └── data/              # Data management
├── components/
│   └── ui/                # Reusable UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       ├── Loading.tsx
│       └── ErrorMessage.tsx
├── hooks/
│   └── use-api.ts         # Custom TanStack Query hooks
├── lib/
│   ├── api-client.ts      # Axios instance with interceptors
│   └── utils.ts           # Utility functions
└── types/
    └── index.ts           # TypeScript type definitions
```

## 🎯 Key Concepts

### TanStack Query Hooks

Custom hooks for common API operations:

```typescript
// GET request
const { data, isLoading, error } = useGet<DataType>(
  ["key"],
  "/api/endpoint"
);

// POST request
const { mutate, isPending } = usePost<PayloadType, ResponseType>(
  "/api/endpoint",
  (data) => console.log("Success:", data)
);

// PUT request
const { mutate } = usePut<PayloadType, ResponseType>("/api/endpoint");

// DELETE request
const { mutate } = useDelete<ResponseType>("/api/endpoint");
```

### Form Validation with Zod

```typescript
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().min(18),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});
```

### API Client

Axios instance with automatic token handling and error interceptors:

```typescript
import { apiClient } from "@/lib/api-client";

// Automatically adds Authorization header
const response = await apiClient.get("/api/data");
```

## 🎨 UI Components

All components support dark mode and are fully typed:

- **Button** - Multiple variants (primary, secondary, danger, ghost)
- **Input** - With label and error message support
- **Card** - Container with header, title, and content sections
- **Loading** - Spinner with customizable text
- **ErrorMessage** - Error display component

## 🔐 Authentication

The API client automatically:
- Adds JWT token to requests from localStorage
- Redirects to login on 401 responses
- Handles token refresh (implement as needed)

## 📱 Responsive Design

All pages are fully responsive with:
- Mobile-first approach
- Tailwind breakpoints (sm, md, lg, xl)
- Dark mode support

## 🚀 Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

Deploy to Vercel, Netlify, or any Node.js hosting platform.

## 🛠️ Development

```bash
# Run development server
npm run dev

# Run linter
npm run lint

# Build project
npm run build
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
