import { Loader2 } from "lucide-react";

export function Loading({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
      <p className="mt-4 text-gray-600 dark:text-gray-400">{text}</p>
    </div>
  );
}
