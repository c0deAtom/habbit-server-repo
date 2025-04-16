import { prisma } from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const habits = await prisma.habit.findMany({
    include: {
      logs: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(habits);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newHabit = await prisma.habit.create({
    data: {
      name: body.name,
    },
  });

  return NextResponse.json(newHabit);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.habit.delete({ where: { id } });
  return new NextResponse("Deleted", { status: 200 });
}