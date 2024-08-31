import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    // console.log(email, password);
    if (!(email && password))
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({ message: "Signin successful", user });

    response.headers.set(
      "Set-Cookie",
      cookie.serialize("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600,
        path: "/",
      })
    );

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Signin failed" }, { status: 500 });
  }
}
