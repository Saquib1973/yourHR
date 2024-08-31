import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "";

//Post jobs
export async function POST(req: NextRequest) {
  try {
    const { title, description, requiredSkills } = await req.json();

    if (!title || !description || !requiredSkills) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newJob = await prisma.job.create({
      data: {
        title,
        description,
        requiredSkills,
      },
    });

    return NextResponse.json({ job: newJob });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}
//Get jobs
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("cookie");
    const token = authHeader?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const userTechStack = user.techStack.split(",");

    //job filtering
    //TODO:Implement filtering using AI
    const jobs = await prisma.job.findMany({
      where: {
        OR: userTechStack.map((tech) => ({
          requiredSkills: {
            contains: tech,
          },
        })),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
