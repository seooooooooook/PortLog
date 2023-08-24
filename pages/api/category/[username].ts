import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if(req.method === 'GET') {
    const category = await prisma.category.findMany({
      where: {
        userId: req.query.username as string
      }
    })
    res.status(200).json({message: 'success', data: category})
  }
  //
  // if(req.method === 'POST') {
  //
  //   const newCategory = await prisma.category.create({
  //     data:{
  //       name : req.body.category,
  //       userId : req.query.username as string,
  //       posts : {
  //         create : {
  //           title: req.body.title,
  //           content: req.body.content,
  //         }
  //       }
  //     }
  //   });
  // }

}
