import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import cookie from "cookie";
import { promises as fs } from "fs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const techStack = formData.getAll("techStack") as string[];
    const file = formData.get("file") as Blob;
    const hashedPassword = await bcrypt.hash(password, 10);

    //@ts-ignore
    const fileName = `${uuidv4()}_${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);
    await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        resume: fileName,
        techStack: techStack.join(","),
      },
    });

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Signup successful",
      user: newUser,
    });

    response.headers.set(
      "Set-Cookie",
      cookie.serialize("auth", token, {
        httpOnly: true,
        maxAge: 3600,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      })
    );

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
