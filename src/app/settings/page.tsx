"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";

export default function SettingsPage() {
  const [apiUrl, setApiUrl] = useState(
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
  );

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Settings
        </h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  label="API Base URL"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="http://localhost:8000"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Configure the base URL for your FastAPI backend
                </p>
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Theme automatically follows your system preferences
                </p>
                <div className="flex gap-4">
                  <Button variant="secondary">Light Mode</Button>
                  <Button variant="secondary">Dark Mode</Button>
                  <Button variant="secondary">System</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p><strong>Version:</strong> 1.0.0</p>
                <p><strong>Framework:</strong> Next.js 16</p>
                <p><strong>State Management:</strong> TanStack Query v5</p>
                <p><strong>Form Handling:</strong> React Hook Form + Zod</p>
                <p><strong>Styling:</strong> Tailwind CSS</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
