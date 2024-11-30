import { type NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } },
) {
  const { username } = await params;

  if (!prisma) return NextResponse.error();
  const category = await prisma.category.findMany({
    where: {
      userId: username,
    },
  });

  if (category) {
    return NextResponse.json(
      { message: 'success', data: category },
      { status: 200 },
    );
  } else {
    return NextResponse.json(
      { message: "post doesn't exists" },
      { status: 500 },
    );
  }
}
