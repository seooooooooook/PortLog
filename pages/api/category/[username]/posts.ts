import type { NextApiRequest, NextApiResponse } from 'next';

export const runtime = 'edge';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const categoryWithPosts = await prisma.category.findMany({
    where: {
      userId: req.query.username as string,
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
  res.status(200).json({ message: 'success', data: categoryWithPosts });
}
