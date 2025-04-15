import { prisma } from '../../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { type } = await req.json(); // 'green' or 'red'
  const habitId = parseInt(params.id);

  const updatedHabit = await prisma.habit.update({
    where: { id: habitId },
    data: type === 'green'
      ? { greenCount: { increment: 1 } }
      : { redCount: { increment: 1 } },
  });

  return NextResponse.json(updatedHabit);
}
