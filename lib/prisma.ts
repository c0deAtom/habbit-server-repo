/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/prisma.ts

import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

// Check if we're in production to initialize a single instance
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Prevent creating multiple PrismaClient instances in development
  if (!(globalThis as any).prisma) {
    (globalThis as any).prisma = new PrismaClient();
  }
  prisma = (globalThis as any).prisma;
}

export { prisma };
