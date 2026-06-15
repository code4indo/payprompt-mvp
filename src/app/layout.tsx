import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PayPrompt - AI-Powered Invoice Reminders | Get Paid Faster",
  description:
    "Stop chasing payments. PayPrompt uses AI to send perfectly timed, personalized invoice reminders. Reduce DSO by 40% on autopilot.",
  keywords: [
    "invoice reminders",
    "payment automation",
    "AI invoicing",
    "DSO reduction",
    "freelancer tools",
    "get paid faster",
  ],
  authors: [{ name: "PayPrompt" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "PayPrompt - AI-Powered Invoice Reminders",
    description: "Stop chasing payments. Get paid faster with AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
