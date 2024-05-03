import "~/styles/globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from "next/font/google";
import { TopNav } from "./_components/TopNav";
import "@uploadthing/react/styles.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Gallery",
  description: "An Awesome Gallery",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${inter.variable} flex flex-col gap-4`}>
          <TopNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
