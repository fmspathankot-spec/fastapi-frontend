"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Loading } from "@/components/ui/Loading";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useGet, useDelete } from "@/hooks/use-api";
import { Trash2, Plus, RefreshCw } from "lucide-react";

interface DataItem {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export default function DataPage() {
  const [page, setPage] = useState(1);
  
  const { data, isLoading, error, refetch } = useGet<DataItem[]>(
    ["data", page.toString()],
    `/api/data?page=${page}`
  );

  const { mutate: deleteItem, isPending: isDeleting } = useDelete<any>("/api/data");

  if (isLoading) return <Loading text="Loading data..." />;
  if (error) return <ErrorMessage message="Failed to load data" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Data Management
          </h1>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => refetch()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((item) => (
            <Card key={item.id} className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteItem(item.id)}
                    isLoading={isDeleting}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {(!data || data.length === 0) && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No data available. Click "Add New" to create your first item.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="secondary"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="flex items-center px-4 text-gray-700 dark:text-gray-300">
            Page {page}
          </span>
          <Button
            variant="secondary"
            onClick={() => setPage((p) => p + 1)}
            disabled={!data || data.length === 0}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
