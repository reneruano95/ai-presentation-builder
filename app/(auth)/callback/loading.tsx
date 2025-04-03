import { Loader2 } from "lucide-react";
import React from "react";

export default function AuthLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
    </div>
  );
}
