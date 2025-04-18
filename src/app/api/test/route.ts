import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma"; // make sure your prisma client is in lib/prisma.ts

// GET all
export async function GET() {
  const data = await prisma.testData.findMany();
  return NextResponse.json(data);
}

// POST create or update via upsert
export async function POST(req: NextRequest) {
    const body = await req.json();
    const saved = await prisma.testData.create({
      data: {
        textField: body.textField,
        numberField: body.numberField,
        booleanField: body.booleanField,
        dateField: new Date(body.dateField),
      },
    });
    return NextResponse.json(saved);
  }


// PUT update by ID
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const updated = await prisma.testData.update({
      where: { id: body.id },
      data: {
        textField: body.textField,
        numberField: body.numberField,
        booleanField: body.booleanField,
        dateField: new Date(body.dateField),
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// DELETE by ID
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();

    const deleted = await prisma.testData.delete({
      where: { id: body.id },
    });

    return NextResponse.json(deleted);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
