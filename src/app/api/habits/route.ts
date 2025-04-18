import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// CREATE Habit
export async function POST(request: Request) {
  try {
    const { 
      title, 
      description, 
      positiveCues, 
      negativeTriggers, 
      motivators, 
      successFactors 
    } = await request.json();

    // Generate a UUID for the habit
    const id = crypto.randomUUID();

    // First, create or get a user
    const user = await prisma.user.upsert({
      where: { id },
      update: {},
      create: {
        id,
        name: "Default User",
        email: `${id}@example.com`,
        personalityInsights: "Default user created for habit tracking"
      } as any
    });

    // Then create the habit
    const habit = await prisma.habit.create({
      data: {
        id,
        userId: user.id,
        title,
        description,
        positiveCues,
        negativeTriggers,
        motivators,
        successFactors
      } as any
    });

    return NextResponse.json(habit);
  } catch (error) {
    console.error('Error creating habit:', error);
    return NextResponse.json({ error: 'Failed to create habit' }, { status: 500 });
  }
}

// GET all habits with events
export async function GET() {
  try {
    const habits = await prisma.habit.findMany({
      include: {
        events: {
          select: {
            id: true,
            type: true,
            notes: true,
            createdAt: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    } as any);

    return NextResponse.json(habits);
  } catch (error) {
    console.error('Error fetching habits:', error);
    return NextResponse.json({ error: 'Failed to fetch habits' }, { status: 500 });
  }
}

// DELETE a habit
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    
    // Delete the habit (this will cascade delete events due to the schema)
    await prisma.habit.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    console.error('Error deleting habit:', error);
    return NextResponse.json({ error: 'Failed to delete habit' }, { status: 500 });
  }
}

// UPDATE a habit
export async function PUT(request: Request) {
  try {
    const { id, title, description, positiveCues, negativeTriggers, motivators, successFactors } = await request.json();
    
    const updatedHabit = await prisma.habit.update({
      where: { id },
      data: {
        title,
        description,
        positiveCues,
        negativeTriggers,
        motivators,
        successFactors
      }
    });

    return NextResponse.json(updatedHabit);
  } catch (error) {
    console.error('Error updating habit:', error);
    return NextResponse.json({ error: 'Failed to update habit' }, { status: 500 });
  }
}
