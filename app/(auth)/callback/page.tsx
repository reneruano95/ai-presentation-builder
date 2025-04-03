import React from "react";
import { onAuthenticateUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";

export default async function AuthCallbackPage() {
  const auth = await onAuthenticateUser();

  if (auth.status === 200 || auth.status === 201) {
    redirect("/dashboard/");
  } else if (
    auth.status === 403 ||
    auth.status === 400 ||
    auth.status === 500
  ) {
    redirect("/sign-in");
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <h1 className="text-2xl font-bold">Redirecting...</h1>
    </div>
  );
}
