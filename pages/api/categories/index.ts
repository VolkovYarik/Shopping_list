import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

const { connectToDatabase } = require('../../../lib/mongodb');

const handler = nextConnect({
  onError(error: any, req, res: NextApiResponse) {
    res
      .status(501)
      .json({ error: `Something went wrong, error: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' is not allowed` });
  },
})
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      let { db } = await connectToDatabase();
      let categories = await db
        .collection('categories')
        .find({})
        .sort({ published: -1 })
        .toArray();
      return res.json({
        data: JSON.parse(JSON.stringify(categories)),
        success: true,
      });
    } catch (error: any) {
      return res.json({
        message: new Error(error).message,
        success: false,
      });
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      let { db } = await connectToDatabase();
      await db.collection('categories').insertOne(req.body);

      return res.json({
        message: 'Category added successfully',
        success: true,
      });
    } catch (error: any) {
      return res.json({
        message: new Error(error).message,
        success: false,
      });
    }
  });

export default handler;
