import cookie from "cookie";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Signout successful" });
  response.headers.set(
    "Set-Cookie",
    cookie.serialize("auth", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      path: "/",
    })
  );
  return response;
}
