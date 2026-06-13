"use client";

import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              PayPrompt
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-emerald-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            {status === "authenticated" && session ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  >
                    Dashboard
                  </Button>
                </Link>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-semibold text-sm">
                    {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-600">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-gray-600 hover:text-emerald-600 font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {status === "authenticated" && session ? (
            <>
              <Link
                href="/dashboard"
                className="block text-center py-2 font-medium text-emerald-600"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="block w-full text-center py-2 font-medium text-gray-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block text-center py-2 font-medium text-gray-600"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block text-center py-2 bg-emerald-600 text-white rounded-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                Get Started Free
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
