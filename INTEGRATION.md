# FastAPI Integration Guide

## Backend Setup (FastAPI)

### 1. Enable CORS

Add CORS middleware to your FastAPI app:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Development
        "https://your-domain.com"  # Production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 2. Example Endpoints

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI()

# Models
class ItemCreate(BaseModel):
    name: str
    description: str

class Item(BaseModel):
    id: int
    name: str
    description: str
    created_at: datetime

# In-memory storage (replace with database)
items_db = []
item_id_counter = 1

# GET all items
@app.get("/api/data", response_model=List[Item])
async def get_items(page: int = 1, per_page: int = 10):
    start = (page - 1) * per_page
    end = start + per_page
    return items_db[start:end]

# GET single item
@app.get("/api/data/{item_id}", response_model=Item)
async def get_item(item_id: int):
    item = next((item for item in items_db if item["id"] == item_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

# POST create item
@app.post("/api/data", response_model=Item)
async def create_item(item: ItemCreate):
    global item_id_counter
    new_item = {
        "id": item_id_counter,
        "name": item.name,
        "description": item.description,
        "created_at": datetime.now()
    }
    items_db.append(new_item)
    item_id_counter += 1
    return new_item

# PUT update item
@app.put("/api/data/{item_id}", response_model=Item)
async def update_item(item_id: int, item: ItemCreate):
    existing_item = next((item for item in items_db if item["id"] == item_id), None)
    if not existing_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    existing_item["name"] = item.name
    existing_item["description"] = item.description
    return existing_item

# DELETE item
@app.delete("/api/data/{item_id}")
async def delete_item(item_id: int):
    global items_db
    items_db = [item for item in items_db if item["id"] != item_id]
    return {"message": "Item deleted successfully"}

# Form submission endpoint
@app.post("/api/submit")
async def submit_form(data: dict):
    # Process form data
    return {"message": "Form submitted successfully", "data": data}

# Users endpoint
@app.get("/api/users")
async def get_users():
    return [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "role": "Admin",
            "created_at": datetime.now()
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "email": "jane@example.com",
            "role": "User",
            "created_at": datetime.now()
        }
    ]
```

## Frontend Integration

### 1. Configure API URL

In `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 2. Using the API Hooks

#### Fetch Data (GET)

```typescript
"use client";

import { useGet } from "@/hooks/use-api";

interface Item {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export default function MyComponent() {
  const { data, isLoading, error, refetch } = useGet<Item[]>(
    ["items"],
    "/api/data"
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      {data?.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

#### Create Data (POST)

```typescript
"use client";

import { usePost } from "@/hooks/use-api";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  description: string;
}

export default function CreateForm() {
  const { register, handleSubmit } = useForm<FormData>();
  
  const { mutate, isPending } = usePost<FormData, any>(
    "/api/data",
    (data) => {
      console.log("Created:", data);
      // Handle success
    }
  );

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" />
      <input {...register("description")} placeholder="Description" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
```

#### Update Data (PUT)

```typescript
"use client";

import { usePut } from "@/hooks/use-api";

export default function UpdateComponent() {
  const { mutate, isPending } = usePut<FormData, any>(
    "/api/data/1",
    (data) => {
      console.log("Updated:", data);
    }
  );

  const handleUpdate = () => {
    mutate({
      name: "Updated Name",
      description: "Updated Description"
    });
  };

  return (
    <button onClick={handleUpdate} disabled={isPending}>
      Update
    </button>
  );
}
```

#### Delete Data (DELETE)

```typescript
"use client";

import { useDelete } from "@/hooks/use-api";

export default function DeleteComponent() {
  const { mutate, isPending } = useDelete<any>(
    "/api/data",
    () => {
      console.log("Deleted successfully");
    }
  );

  const handleDelete = (id: number) => {
    mutate(id);
  };

  return (
    <button onClick={() => handleDelete(1)} disabled={isPending}>
      Delete
    </button>
  );
}
```

### 3. Form with Validation

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePost } from "@/hooks/use-api";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  age: z.number().min(18, "Must be 18 or older"),
});

type FormData = z.infer<typeof schema>;

export default function ValidatedForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = usePost<FormData, any>(
    "/api/submit",
    () => {
      reset();
    }
  );

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))}>
      <div>
        <input {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      
      <div>
        <input {...register("email")} type="email" />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      
      <div>
        <input {...register("age", { valueAsNumber: true })} type="number" />
        {errors.age && <span>{errors.age.message}</span>}
      </div>
      
      <button type="submit" disabled={isPending}>
        Submit
      </button>
    </form>
  );
}
```

## Authentication

### Backend (FastAPI)

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt

security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

@app.get("/api/protected")
async def protected_route(user = Depends(verify_token)):
    return {"message": "Access granted", "user": user}
```

### Frontend

The API client automatically handles tokens:

```typescript
// Login and store token
const login = async (email: string, password: string) => {
  const response = await apiClient.post("/api/login", { email, password });
  localStorage.setItem("token", response.data.token);
};

// Token is automatically added to all requests
// See src/lib/api-client.ts
```

## Error Handling

### Backend

```python
from fastapi import HTTPException

@app.get("/api/data/{item_id}")
async def get_item(item_id: int):
    if item_id not in items:
        raise HTTPException(
            status_code=404,
            detail="Item not found"
        )
    return items[item_id]
```

### Frontend

Errors are automatically handled by the hooks:

```typescript
const { data, error } = useGet<Item>(["item", id], `/api/data/${id}`);

if (error) {
  // Error is automatically shown via toast
  // You can also handle it manually
  console.error(error);
}
```

## Testing the Integration

1. Start FastAPI backend:
```bash
uvicorn main:app --reload
```

2. Start Next.js frontend:
```bash
npm run dev
```

3. Test endpoints:
- Visit http://localhost:3000
- Navigate to different pages
- Check browser console and Network tab
- Verify API calls in FastAPI logs

## Production Deployment

### Backend
- Deploy FastAPI to Railway, Render, or AWS
- Update CORS origins with production URL

### Frontend
- Update `.env.local` with production API URL
- Deploy to Vercel: `vercel --prod`

## Troubleshooting

### CORS Issues
- Verify CORS middleware in FastAPI
- Check allowed origins match frontend URL
- Ensure credentials are enabled

### 401 Errors
- Check token in localStorage
- Verify token format in Authorization header
- Check token expiration

### Network Errors
- Verify API URL in `.env.local`
- Check FastAPI is running
- Test endpoints with curl or Postman

## Next Steps

1. Add authentication flow
2. Implement real database (PostgreSQL, MongoDB)
3. Add file upload functionality
4. Implement WebSocket for real-time updates
5. Add comprehensive error handling
6. Set up automated testing
