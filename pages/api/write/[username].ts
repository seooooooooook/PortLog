import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let createPost;
  try {
    createPost = await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        categoryId: req.body.categoryId,
      },
    });
    res.status(200).json({ message: 'success', pid: createPost.id });
  } catch (e) {
    console.error('Create Post Error', e);
    res.status(500).json({ message: 'Create Post Error' });
  }
}
