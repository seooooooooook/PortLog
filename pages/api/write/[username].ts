import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  try{
    const newCategory = await prisma.category.create({
      data:{
        name : req.body.category,
        userId : req.query.username as string,
        posts : {
          create : {
            title: req.body.title,
            content: req.body.content,
          }
        }
      }
    });
  }catch (e) {
    console.error('Create Category Error', e)
  }

  if (true) {
    res.status(200).json({ message: 'success', data: postList });
  } else {
    res.status(500).json({ message: "post doesn't exists" });
  }
}
