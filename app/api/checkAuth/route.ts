import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function GET(req: NextRequest) {
  const authCookie = req.cookies.get("auth");

  if (!authCookie) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 400 });
  }

  try {
    jwt.verify(authCookie.value, JWT_SECRET);
    return NextResponse.json({ message: "Authenticated" });
  } catch (err) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 400 });
  }
}
