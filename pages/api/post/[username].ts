import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const postList = await prisma.category.findMany({
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

  if (postList) {
    res.status(200).json({ message: 'success', data: postList });
  } else {
    res.status(500).json({ message: "post doesn't exists" });
  }
}
