import { type NextRequest, NextResponse } from 'next/server';

type Params = {
  pid: string;
};
export async function GET(
  request: Request,
  { params }: { params: Promise<Params> },
) {
  const pid = (await params).pid;
  if (!prisma) {
    return NextResponse.error();
  }
  try {
    const content = await prisma.post.findUnique({
      where: {
        id: Number(pid),
      },
    });

    return NextResponse.json({ message: 'ok', content }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: 'post not found' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { pid: string } },
) {
  const { pid } = await params;
  const { request } = await req.json();
  try {
    if (!prisma) {
      return NextResponse.error();
    }
    const updatePost = await prisma.post.update({
      where: {
        id: Number(pid),
      },
      data: {
        title: request.body.title,
        content: request.body.content,
        categoryId: request.body.categoryId,
      },
    });

    return NextResponse.json(
      { message: 'ok', pid: updatePost.id },
      { status: 201 },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'post update error' }, { status: 500 });
  }
}

export async function DELETE({ params }: { params: { pid: string } }) {
  const { pid } = await params;
  if (!prisma) {
    return NextResponse.error();
  }

  const delPost = await prisma.post.delete({
    where: {
      id: Number(pid),
    },
  });

  if (delPost) {
    return NextResponse.json({ message: 'delete succeed' }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'post not found' }, { status: 500 });
  }
}
