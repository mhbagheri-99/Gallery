import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const TopNav = () => (
  <nav className="bg-gray-800 flex items-center justify-between p-4 border-b">
    <h1 className="text-2xl font-semibold">Gallery</h1>
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  </nav>
);