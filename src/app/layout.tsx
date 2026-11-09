import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AppHeader } from "@/components/app-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevOps Release Checklist",
  description:
    "A lightweight deployment readiness dashboard built with Next.js.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <AppHeader />
          <div className="flex-1">
            {children}
          </div>
          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-6xl px-4 py-5 text-center text-xs text-slate-400 sm:px-6 lg:px-8">
              DevOps Release Checklist · Built with Next.js
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
