import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      try {
        const content = await prisma.post.findUnique({
          where: {
            id: Number(req.query.pid),
          },
        });

        res.status(200).json({ message: 'ok', content });
      } catch (e) {
        res.status(500).json({ message: 'post not found' });
      }

      break;
    case 'DELETE':
      const delPost = await prisma.post.delete({
        where: {
          id: Number(req.query.pid),
        },
      });

      if (delPost) {
        res.status(200).json({ message: 'delete succeed', delPost });
      } else {
        res.status(500).json({ message: "post doesn't exists" });
      }

      break;
    case 'PUT':
      try {
        const updatePost = await prisma.post.update({
          where: {
            id: Number(req.query.pid),
          },
          data: {
            title: req.body.title,
            content: req.body.content,
            categoryId: req.body.categoryId,
          },
        });

        res.status(201).json({ message: 'ok', pid: updatePost.id });
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'update error' });
      }
      break;
    default:
      res.status(405).json({ message: 'method not allowed' });
  }
}
