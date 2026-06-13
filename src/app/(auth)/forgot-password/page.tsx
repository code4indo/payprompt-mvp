"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Loader2, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [resetToken, setResetToken] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSent(true);
        // For MVP, store the token so user can use it
        if (data.resetToken) {
          setResetToken(data.resetToken);
        }
      } else {
        setErrorMsg(data.error || "Gagal mengirim email reset password.");
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          PayPrompt
        </span>
      </Link>

      <Card className="w-full max-w-md shadow-lg border-gray-200">
        {!isSent ? (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Lupa Password?
              </CardTitle>
              <CardDescription>
                Masukkan email Anda dan kami akan mengirim link untuk mereset
                password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                    {errorMsg}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    "Kirim Link Reset Password"
                  )}
                </Button>
              </form>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl font-bold">Email Terkirim!</CardTitle>
              <CardDescription>
                Jika email <strong>{email}</strong> terdaftar, link reset
                password telah dikirim.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {resetToken && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800 mb-2">
                    <strong>MVP Demo:</strong> Gunakan link berikut untuk reset
                    password:
                  </p>
                  <Link
                    href={`/reset-password?token=${resetToken}`}
                    className="text-sm text-emerald-600 hover:text-emerald-700 underline break-all"
                  >
                    Reset Password
                  </Link>
                </div>
              )}
              <p className="text-sm text-gray-500 text-center">
                Tidak menerima email? Periksa folder spam atau{" "}
                <button
                  onClick={() => {
                    setIsSent(false);
                    setResetToken("");
                  }}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  coba lagi
                </button>
              </p>
            </CardContent>
          </>
        )}
        <CardFooter className="justify-center">
          <Link
            href="/login"
            className="text-sm text-gray-500 hover:text-emerald-600 flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
