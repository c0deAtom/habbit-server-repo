import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';


export async function GET() {
  const habits = await prisma.habit.findMany();
  return NextResponse.json(habits);
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  const newHabit = await prisma.habit.create({
    data: { name },
  });
  return NextResponse.json(newHabit);
}

export async function PUT(req: NextRequest) {
  const { id, positive, negative } = await req.json();

  const updatedHabit = await prisma.habit.update({
    where: { id },
    data: { positive, negative },
  });

  return NextResponse.json(updatedHabit);
}

