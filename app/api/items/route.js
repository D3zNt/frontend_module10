import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${process.env.BACKEND_URL}/items`);
  const data = await res.json();

  return NextResponse.json(data);
}