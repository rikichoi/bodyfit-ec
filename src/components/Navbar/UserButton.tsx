import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";

export default async function UserButton() {
  const session = await getServerSession(authOptions);

  return (
    <div className="ml-auto flex w-1/3 flex-row items-center justify-end gap-5">
      {session ? <SignOutButton /> : <SignInButton />}
    </div>
  );
}
