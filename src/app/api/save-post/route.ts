// app/api/save-post/route.ts
import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json(); // assumes { title, content }
  const post = await prisma.post.create({
    data,
  });

  return NextResponse.json(post, { status: 201 });
}
