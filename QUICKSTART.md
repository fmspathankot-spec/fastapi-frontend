# ⚡ Quick Start Guide

Get your FastAPI frontend running in 5 minutes!

## 🚀 Step 1: Clone & Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/fmspathankot-spec/fastapi-frontend.git

# Navigate to project
cd fastapi-frontend

# Install dependencies
npm install
```

## ⚙️ Step 2: Configure (1 minute)

```bash
# Copy environment file
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🎯 Step 3: Run (1 minute)

```bash
# Start development server
npm run dev
```

Open **http://localhost:3000** in your browser! 🎉

## 📱 What You'll See

### Homepage
- Beautiful gradient background
- 4 feature cards (Data, Forms, Users, Settings)
- Quick start guide
- Smooth animations

### Navigation
- Top navbar with active page highlighting
- Easy navigation between pages
- Responsive design

### Pages Ready to Use
1. **Forms** (`/forms`) - Form with validation
2. **Data** (`/data`) - CRUD operations
3. **Users** (`/users`) - User management
4. **Settings** (`/settings`) - Configuration

## 🔌 Connect to Your FastAPI Backend

### Option 1: Use Example Backend

Create a simple FastAPI backend:

```python
# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

@app.get("/api/data")
def get_data():
    return [
        {"id": 1, "name": "Item 1", "description": "First item", "created_at": "2024-01-01"},
        {"id": 2, "name": "Item 2", "description": "Second item", "created_at": "2024-01-02"},
    ]

@app.get("/api/users")
def get_users():
    return [
        {"id": 1, "name": "John Doe", "email": "john@example.com", "role": "Admin", "created_at": "2024-01-01"},
        {"id": 2, "name": "Jane Smith", "email": "jane@example.com", "role": "User", "created_at": "2024-01-02"},
    ]
```

Run it:
```bash
pip install fastapi uvicorn
uvicorn main:app --reload
```

### Option 2: Use Your Existing Backend

Just update the API URL in `.env.local` to point to your backend!

## 🎨 Customize

### Change Colors

Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: "#your-color",
    },
  },
}
```

### Add New Page

1. Create `src/app/your-page/page.tsx`
2. Add to navbar in `src/components/Navbar.tsx`

### Modify API Endpoints

Edit `src/services/api.service.ts` to match your backend endpoints.

## 📚 Learn More

- **README.md** - Full documentation
- **SETUP.md** - Detailed setup guide
- **INTEGRATION.md** - FastAPI integration examples
- **PROJECT_SUMMARY.md** - Complete project overview

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### CORS Errors
- Check FastAPI CORS middleware
- Verify API URL in `.env.local`

### Dependencies Issues
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

## ✅ Checklist

- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] Environment configured
- [ ] Development server running
- [ ] Can access http://localhost:3000
- [ ] FastAPI backend running (optional)
- [ ] CORS configured (if using backend)

## 🎉 You're Ready!

Your modern Next.js frontend is now running with:
- ✅ TanStack Query for data fetching
- ✅ React Hook Form for forms
- ✅ Zod for validation
- ✅ Tailwind CSS for styling
- ✅ TypeScript for type safety
- ✅ Beautiful UI components

**Start building your application!** 🚀

## 📞 Need Help?

Check the documentation files:
- Issues with setup? → **SETUP.md**
- Connecting to FastAPI? → **INTEGRATION.md**
- Understanding the project? → **PROJECT_SUMMARY.md**

Happy coding! 💻✨
