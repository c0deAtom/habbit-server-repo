import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { type } = await request.json();
    const habitId = params.id;

    // Get the habit to get the userId
    const habit = await prisma.habit.findUnique({
      where: { id: habitId }
    });

    if (!habit) {
      return NextResponse.json({ error: 'Habit not found' }, { status: 404 });
    }

    // Create a new event
    const event = await prisma.habitEvent.create({
      data: {
        habitId,
        userId: habit.userId,
        type,
        notes: null
      }
    });

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record event' }, { status: 500 });
  }
} 