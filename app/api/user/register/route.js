// app/api/user/register/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  
  // Use the private BACKEND_URL variable here
  const res = await fetch(`${process.env.BACKEND_URL}/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}