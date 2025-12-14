/**
 * API Service Layer
 * 
 * This file contains all API service functions for interacting with the FastAPI backend.
 * Each function is typed and handles a specific API endpoint.
 */

import { apiClient } from "@/lib/api-client";
import { User, PaginatedResponse } from "@/types";

// ============================================================================
// DATA ENDPOINTS
// ============================================================================

export interface DataItem {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface CreateDataItem {
  name: string;
  description: string;
}

export const dataService = {
  // Get all data items with pagination
  getAll: async (page: number = 1, perPage: number = 10) => {
    const { data } = await apiClient.get<PaginatedResponse<DataItem>>(
      `/api/data?page=${page}&per_page=${perPage}`
    );
    return data;
  },

  // Get single data item by ID
  getById: async (id: number) => {
    const { data } = await apiClient.get<DataItem>(`/api/data/${id}`);
    return data;
  },

  // Create new data item
  create: async (item: CreateDataItem) => {
    const { data } = await apiClient.post<DataItem>("/api/data", item);
    return data;
  },

  // Update existing data item
  update: async (id: number, item: CreateDataItem) => {
    const { data } = await apiClient.put<DataItem>(`/api/data/${id}`, item);
    return data;
  },

  // Delete data item
  delete: async (id: number) => {
    const { data } = await apiClient.delete(`/api/data/${id}`);
    return data;
  },
};

// ============================================================================
// USER ENDPOINTS
// ============================================================================

export interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUser {
  name?: string;
  email?: string;
}

export const userService = {
  // Get all users
  getAll: async () => {
    const { data } = await apiClient.get<User[]>("/api/users");
    return data;
  },

  // Get current user profile
  getProfile: async () => {
    const { data } = await apiClient.get<User>("/api/users/me");
    return data;
  },

  // Get user by ID
  getById: async (id: number) => {
    const { data } = await apiClient.get<User>(`/api/users/${id}`);
    return data;
  },

  // Create new user
  create: async (user: CreateUser) => {
    const { data } = await apiClient.post<User>("/api/users", user);
    return data;
  },

  // Update user
  update: async (id: number, user: UpdateUser) => {
    const { data } = await apiClient.put<User>(`/api/users/${id}`, user);
    return data;
  },

  // Delete user
  delete: async (id: number) => {
    const { data } = await apiClient.delete(`/api/users/${id}`);
    return data;
  },
};

// ============================================================================
// AUTHENTICATION ENDPOINTS
// ============================================================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export const authService = {
  // Login
  login: async (credentials: LoginCredentials) => {
    const { data } = await apiClient.post<AuthResponse>("/api/auth/login", credentials);
    // Store token in localStorage
    localStorage.setItem("token", data.access_token);
    return data;
  },

  // Logout
  logout: async () => {
    localStorage.removeItem("token");
    const { data } = await apiClient.post("/api/auth/logout");
    return data;
  },

  // Register
  register: async (user: CreateUser) => {
    const { data } = await apiClient.post<AuthResponse>("/api/auth/register", user);
    localStorage.setItem("token", data.access_token);
    return data;
  },

  // Refresh token
  refresh: async () => {
    const { data } = await apiClient.post<AuthResponse>("/api/auth/refresh");
    localStorage.setItem("token", data.access_token);
    return data;
  },

  // Verify token
  verify: async () => {
    const { data } = await apiClient.get("/api/auth/verify");
    return data;
  },
};

// ============================================================================
// FORM SUBMISSION ENDPOINTS
// ============================================================================

export interface FormSubmission {
  name: string;
  email: string;
  age: number;
  message: string;
}

export const formService = {
  // Submit form
  submit: async (formData: FormSubmission) => {
    const { data } = await apiClient.post("/api/submit", formData);
    return data;
  },
};

// ============================================================================
// FILE UPLOAD ENDPOINTS
// ============================================================================

export const fileService = {
  // Upload single file
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    
    const { data } = await apiClient.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },

  // Upload multiple files
  uploadFiles: async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    
    const { data } = await apiClient.post("/api/upload/multiple", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },

  // Delete file
  deleteFile: async (fileId: string) => {
    const { data } = await apiClient.delete(`/api/files/${fileId}`);
    return data;
  },
};

// ============================================================================
// SEARCH ENDPOINTS
// ============================================================================

export interface SearchParams {
  query: string;
  filters?: Record<string, any>;
  page?: number;
  perPage?: number;
}

export const searchService = {
  // Search data
  search: async (params: SearchParams) => {
    const { data } = await apiClient.post("/api/search", params);
    return data;
  },
};

// ============================================================================
// ANALYTICS ENDPOINTS
// ============================================================================

export const analyticsService = {
  // Get dashboard stats
  getDashboardStats: async () => {
    const { data } = await apiClient.get("/api/analytics/dashboard");
    return data;
  },

  // Get user activity
  getUserActivity: async (userId: number, days: number = 30) => {
    const { data } = await apiClient.get(
      `/api/analytics/users/${userId}/activity?days=${days}`
    );
    return data;
  },
};

// ============================================================================
// EXPORT ALL SERVICES
// ============================================================================

export const api = {
  data: dataService,
  users: userService,
  auth: authService,
  forms: formService,
  files: fileService,
  search: searchService,
  analytics: analyticsService,
};

export default api;
