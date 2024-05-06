'use client';

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./SimpleUploadButton";

export const TopNav = () => {

  return (
  <nav className="bg-gray-800 flex items-center justify-between 
  p-4 border-b text-2xl font-semibold">
    <h1>Gallery</h1>
    <div className="flex flex-row gap-4 items-center">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <SimpleUploadButton />
        <UserButton />
      </SignedIn>
    </div>
  </nav>
)
};