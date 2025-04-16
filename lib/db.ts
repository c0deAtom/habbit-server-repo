// lib/db.ts
import { prisma } from "./prisma"; // or your DB client

export const saveHabitsToDB = async (habits: any[]) => {
  for (const habit of habits) {
    await prisma.habit.upsert({
      where: { id: habit.id },
      update: {
        name: habit.name,
        logs: habit.logs,
      },
      create: {
        id: habit.id,
        name: habit.name,
        logs: habit.logs,
      },
    });
  }
};
