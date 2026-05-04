import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await axios.post(
      `${process.env.BACKEND_URL}/user/register`, 
      body
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Backend Error:", error.response?.data || error.message);
    
    return NextResponse.json(
      { message: error.response?.data?.message || "Internal Server Error" },
      { status: error.response?.status || 500 }
    );
  }
}