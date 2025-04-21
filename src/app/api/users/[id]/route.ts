import { prisma } from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: any
) {
  try {
    const userId = parseInt(params.id); // Convert string to number

    await prisma.user.delete({
      where: { id: userId.toString() },
    });

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
