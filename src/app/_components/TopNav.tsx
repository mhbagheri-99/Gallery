'use client';

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

export const TopNav = () => {
  const router = useRouter();

  return (
  <nav className="bg-gray-800 flex items-center justify-between 
  p-4 border-b text-2xl font-semibold">
    <h1>Gallery</h1>
    <div className="flex flex-row">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UploadButton 
          endpoint="imageUploader"
          onClientUploadComplete={() => router.refresh()}
        />
        <UserButton />
      </SignedIn>
    </div>
  </nav>
)
};