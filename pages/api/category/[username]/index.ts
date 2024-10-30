import type { NextApiRequest, NextApiResponse } from 'next';

export const config = { runtime: 'experimental-edge' };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const category = await prisma.category.findMany({
    where: {
      userId: req.query.username as string,
    },
  });

  if (category) {
    res.status(200).json({ message: 'success', data: category });
  } else {
    res.status(500).json({ message: "post doesn't exists" });
  }
}
