import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password wajib diisi");
        }

        try {
          const user = await db.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error("Email tidak terdaftar");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Password salah");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            plan: user.plan,
          };
        } catch (error: any) {
          // Re-throw known auth errors
          if (
            error.message === "Email tidak terdaftar" ||
            error.message === "Password salah" ||
            error.message === "Email dan password wajib diisi"
          ) {
            throw error;
          }
          // Database connection errors
          console.error("Auth database error:", error);
          throw new Error(
            "Layanan sedang dalam pemeliharaan. Silakan coba lagi nanti."
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.plan = (user as any).plan;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).plan = token.plan;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
