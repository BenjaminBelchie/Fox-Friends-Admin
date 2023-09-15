import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      await prisma.aboutMeDetails.update({
        where: { id: data.id },
        data: {
          titleText: data.title,
          description: data.aboutMe,
          image: data.image,
        },
      });
      const updatedAboutMeDetails = await prisma.aboutMeDetails.findFirst();
      res.status(200).json(updatedAboutMeDetails);
    } catch (err) {
      res.status(500).send(err.message);
    }
  } else {
    res.status(400).send('Invalid request method');
  }
}
