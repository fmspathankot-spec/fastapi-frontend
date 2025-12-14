"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Loading } from "@/components/ui/Loading";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useGet } from "@/hooks/use-api";
import { User, Mail, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export default function UsersPage() {
  const { data: users, isLoading, error } = useGet<UserData[]>(
    ["users"],
    "/api/users"
  );

  if (isLoading) return <Loading text="Loading users..." />;
  if (error) return <ErrorMessage message="Failed to load users" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Users
          </h1>
          <Button>Add User</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users?.map((user) => (
            <Card key={user.id} className="hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {user.role}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4 mr-2" />
                    {user.email}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    Joined {formatDate(user.created_at)}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="secondary" className="flex-1">
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" className="flex-1">
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {(!users || users.length === 0) && (
          <Card className="text-center py-12">
            <CardContent>
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No users found. Add your first user to get started.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
