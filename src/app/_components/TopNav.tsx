"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./SimpleUploadButton";

export const TopNav = () => {
  return (
    <nav
      className="flex items-center justify-between border-b p-4 text-2xl font-semibold"
    >
      <h1>Gallery</h1>
      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};
