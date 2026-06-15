import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db, checkDatabaseConnection } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    // Check database connectivity first
    const dbConnected = await checkDatabaseConnection();
    if (!dbConnected) {
      console.error("Database is not connected during registration attempt");
      return NextResponse.json(
        {
          error:
            "Layanan sedang dalam pemeliharaan. Silakan coba lagi dalam beberapa menit.",
          code: "DB_UNAVAILABLE",
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nama, email, dan password wajib diisi" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password minimal 8 karakter" },
        { status: 400 }
      );
    }

    if (name.length < 2) {
      return NextResponse.json(
        { error: "Nama minimal 2 karakter" },
        { status: 400 }
      );
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar. Silakan login." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        plan: "free",
      },
    });

    return NextResponse.json(
      {
        message: "Akun berhasil dibuat!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);

    // Handle specific Prisma errors
    if (error?.code === "P1001") {
      return NextResponse.json(
        {
          error:
            "Tidak dapat terhubung ke database. Silakan coba lagi dalam beberapa menit.",
          code: "DB_CONNECTION_FAILED",
        },
        { status: 503 }
      );
    }

    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "Email sudah terdaftar. Silakan login." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Terjadi kesalahan server. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
