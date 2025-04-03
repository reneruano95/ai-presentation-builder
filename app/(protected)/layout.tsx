export const dynamic = "force-dynamic"; // Force dynamic rendering for this layout
import { onAuthenticateUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};
export default async function Layout({ children }: Props) {
  const auth = await onAuthenticateUser();

  if (!auth.user) {
    redirect("/sign-in");
  }
  return <div className="w-full min-h-screen">{children}</div>;
}
