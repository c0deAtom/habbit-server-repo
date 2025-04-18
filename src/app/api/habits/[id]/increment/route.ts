import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { counter } = await request.json();
    const habitId = params.id;

    // Update the habit's counter
    const habit = await prisma.habit.update({
      where: { id: habitId },
      data: {
        ...(counter === 1 ? { counter1: { increment: 1 } } : { counter2: { increment: 1 } }),
      },
    });

    // Create a log entry
    await prisma.log.create({
      data: {
        counter,
        habitId,
      },
    });

    return NextResponse.json(habit);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to increment counter' }, { status: 500 });
  }
} 