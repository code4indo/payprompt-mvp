import { NextResponse } from "next/server";
import { checkDatabaseConnection } from "@/lib/db";

export async function GET() {
  const dbConnected = await checkDatabaseConnection();

  return NextResponse.json({
    status: dbConnected ? "healthy" : "degraded",
    database: dbConnected ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
}
