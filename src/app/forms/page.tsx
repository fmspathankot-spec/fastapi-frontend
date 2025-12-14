"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { usePost } from "@/hooks/use-api";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "Must be at least 18 years old").max(120, "Invalid age"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function FormsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = usePost<FormData, any>("/api/submit", (data) => {
    toast.success("Form submitted successfully!");
    reset();
  });

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
    mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Modern Form with Validation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Name"
                {...register("name")}
                error={errors.name?.message}
                placeholder="Enter your name"
              />

              <Input
                label="Email"
                type="email"
                {...register("email")}
                error={errors.email?.message}
                placeholder="your.email@example.com"
              />

              <Input
                label="Age"
                type="number"
                {...register("age", { valueAsNumber: true })}
                error={errors.age?.message}
                placeholder="18"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  rows={4}
                  placeholder="Enter your message..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <Button type="submit" isLoading={isPending} className="flex-1">
                  Submit Form
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => reset()}
                >
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Form Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✅ React Hook Form for efficient form handling</li>
              <li>✅ Zod schema validation</li>
              <li>✅ TanStack Query for API mutations</li>
              <li>✅ Real-time error messages</li>
              <li>✅ Loading states and toast notifications</li>
              <li>✅ Type-safe with TypeScript</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
