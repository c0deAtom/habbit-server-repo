import { prisma } from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

   
    const savedHabit = await prisma.habit.create({
      data: {
        id: data.id,
        name: data.name,
       
      },
    });

    return NextResponse.json({ success: true, savedHabit });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Caught error:", error.message);
    } else {
      console.error("Unknown error", error);
    }
  }
}


export async function GET() {
  try {
    const habits = await prisma.habit.findMany();
    return NextResponse.json(habits);
  } catch (error) {
    console.error("Error fetching habits:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.habit.delete({ where: { id } });
  return new NextResponse("Deleted", { status: 200 });
}