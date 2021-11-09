import { NextApiRequest, NextApiResponse } from "next";
import { File, UploadApiRequest } from "types/NextApiTypes";
import nextConnect from "next-connect";

const multer = require('multer')
const { connectToDatabase } = require('../../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

const upload = multer({
   storage: multer.diskStorage({
      destination: './public/uploads',
      filename: (req: NextApiRequest, file: File, cb: (error: Error | null, destination: string) => void) =>
         cb(null, file.originalname.replace(/\s/g, '')),
   }),
});

const handler = nextConnect({
   onError(error: any, req: NextApiRequest, res: NextApiResponse) {
      res.status(501).json({ error: `Something went wrong, error: ${error.message}` });
   },
   onNoMatch(req: NextApiRequest, res: NextApiResponse) {
      res.status(405).json({ error: `Method '${req.method}' is not allowed` });
   },
})

   .use(upload.single('file'))

   .put(async (req: UploadApiRequest, res) => {
      try {
         let { db } = await connectToDatabase();
         const filename = req.file.path.replace(/\s/g, '').replace('public', '')
         await db.collection('products').updateOne(
            {
               _id: new ObjectId(req.query.id)
            },
            { $set: { image: filename } }
         );

         return res.json({
            message: "Product added successfully",
            success: true
         });
      } catch (error: any) {
         return res.json({
            message: new Error(error).message,
            success: false
         });
      }
   });

export default handler;
export const config = {
   api: {
      bodyParser: false,
   },
};