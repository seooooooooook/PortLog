import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
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
      break;
    default:
      res.status(405).json({ message: 'method not allowed' });
  }
}
