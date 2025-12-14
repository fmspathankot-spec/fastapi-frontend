import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

// Generic GET hook
export function useGet<T>(key: string[], url: string, enabled = true) {
  return useQuery<T>({
    queryKey: key,
    queryFn: async () => {
      const { data } = await apiClient.get(url);
      return data;
    },
    enabled,
  });
}

// Generic POST hook
export function usePost<T, R>(url: string, onSuccessCallback?: (data: R) => void) {
  const queryClient = useQueryClient();

  return useMutation<R, Error, T>({
    mutationFn: async (payload: T) => {
      const { data } = await apiClient.post(url, payload);
      return data;
    },
    onSuccess: (data) => {
      toast.success("Operation successful!");
      queryClient.invalidateQueries();
      onSuccessCallback?.(data);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || "Operation failed!");
    },
  });
}

// Generic PUT hook
export function usePut<T, R>(url: string, onSuccessCallback?: (data: R) => void) {
  const queryClient = useQueryClient();

  return useMutation<R, Error, T>({
    mutationFn: async (payload: T) => {
      const { data } = await apiClient.put(url, payload);
      return data;
    },
    onSuccess: (data) => {
      toast.success("Updated successfully!");
      queryClient.invalidateQueries();
      onSuccessCallback?.(data);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || "Update failed!");
    },
  });
}

// Generic DELETE hook
export function useDelete<R>(url: string, onSuccessCallback?: (data: R) => void) {
  const queryClient = useQueryClient();

  return useMutation<R, Error, string | number>({
    mutationFn: async (id: string | number) => {
      const { data } = await apiClient.delete(`${url}/${id}`);
      return data;
    },
    onSuccess: (data) => {
      toast.success("Deleted successfully!");
      queryClient.invalidateQueries();
      onSuccessCallback?.(data);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || "Delete failed!");
    },
  });
}
