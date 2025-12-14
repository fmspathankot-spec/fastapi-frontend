"use client";

import Link from "next/link";
import { Database, FileText, Users, Settings } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Database,
      title: "Data Management",
      description: "Manage your data with powerful CRUD operations",
      href: "/data",
    },
    {
      icon: FileText,
      title: "Forms",
      description: "Modern form handling with validation",
      href: "/forms",
    },
    {
      icon: Users,
      title: "Users",
      description: "User management and authentication",
      href: "/users",
    },
    {
      icon: Settings,
      title: "Settings",
      description: "Configure your application settings",
      href: "/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            FastAPI Frontend
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Modern Next.js 16 with TanStack Query & React Hook Form
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.href}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🚀 Quick Start
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="flex items-start">
              <span className="font-mono bg-indigo-100 dark:bg-indigo-900 px-3 py-1 rounded mr-3">1</span>
              <p>Clone the repository and install dependencies with <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">npm install</code></p>
            </div>
            <div className="flex items-start">
              <span className="font-mono bg-indigo-100 dark:bg-indigo-900 px-3 py-1 rounded mr-3">2</span>
              <p>Copy <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">.env.local.example</code> to <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">.env.local</code></p>
            </div>
            <div className="flex items-start">
              <span className="font-mono bg-indigo-100 dark:bg-indigo-900 px-3 py-1 rounded mr-3">3</span>
              <p>Start the development server with <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">npm run dev</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
