import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        categoryId: req.body.categoryId,
      },
    });
  } catch (e) {
    console.error('Create Category Error', e);
  }

  if (true) {
    res.status(200).json({ message: 'success' });
  } else {
    res.status(500).json({ message: "post doesn't exists" });
  }
}
