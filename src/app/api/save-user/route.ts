import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma'; 

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

   
    const savedUser = await prisma.user.create({
      data: {
        name: data.name,
        about: data.about,
        q1: data.q1,
        q2: data.q2,
        q3: data.q3,
        q4: data.q4,
      },
    });

    return NextResponse.json({ success: true, user: savedUser });
  } catch (error) {
    console.error('Error saving user:', error);
    return new NextResponse('Failed to save user', { status: 500 });
  }
}


