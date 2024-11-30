import { type NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } },
) {
  const { username } = await params;

  if (!prisma) return NextResponse.error();
  const categoryWithPosts = await prisma.category.findMany({
    where: {
      userId: username,
    },
    select: {
      id: true,
      name: true,
      posts: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  return NextResponse.json(
    { message: 'success', data: categoryWithPosts },
    { status: 200 },
  );
}
