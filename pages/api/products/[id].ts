import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

const { connectToDatabase } = require('../../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

const handler = nextConnect({
   onError(error: any, req, res: NextApiResponse) {
      res.status(501).json({ error: `Something went wrong, error: ${error.message}` });
   },
   onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' is not allowed` });
   },
})
   .patch(async (req: NextApiRequest, res: NextApiResponse) => {
      try {
         let { db } = await connectToDatabase();

         await db.collection('products').updateOne(
            {
               _id: new ObjectId(req.query.id)
            },
            { $set: { name: req.body.name, category: req.body.category, class: req.body.class } }
         )

         return res.json({
            message: 'Product updated successfully',
            success: true,
         })
      } catch (error: any) {
         return res.json({
            message: new Error(error).message,
            success: false,
         })
      }
   })
   .delete(async (req: NextApiRequest, res: NextApiResponse) => {
      try {
         let { db } = await connectToDatabase();
         await db.collection('products').deleteOne({
            _id: new ObjectId(req.query.id)
         });

         return res.json({
            message: 'Product deleted successfully',
            success: true,
         });
      } catch (error: any) {

         return res.json({
            message: new Error(error).message,
            success: false,
         });
      }
   })

export default handler