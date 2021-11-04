import { ApiQuery } from "types/NextApiTypes";

const { connectToDatabase } = require('../../../lib/mongodb');

const ObjectId = require('mongodb').ObjectId;

const handler: ApiQuery = async (req, res) => {
   switch (req.method) {
      case 'DELETE': {
         return deleteProduct(req, res);
      }
   }
}

const deleteProduct: ApiQuery = async (req, res) => {
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
}

export default handler