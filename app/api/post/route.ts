import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const request = await req.json();
    const { title, content, categoryId } = request.body;
    if (!prisma) {
      return NextResponse.error();
    }
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        categoryId: categoryId,
      },
    });

    return NextResponse.json(
      { message: 'success', pid: post.id },
      { status: 201 },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}
