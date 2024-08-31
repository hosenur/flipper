import "@repo/ui/globals.css";
import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono"
import { cn } from "@repo/ui/lib/utils";
import { Toaster } from "@repo/ui/components/ui/sonner";
import NextTopLoader from 'nextjs-toploader';
export const metadata: Metadata = {
  title: "Flipper",
  description: "Self hosted feature flags.  ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(GeistMono.className)}>
        <NextTopLoader height={1} color="#f0f0f0" />

        <main>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
