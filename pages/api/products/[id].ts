import { ApiQuery } from "types/NextApiTypes";

const { connectToDatabase } = require('../../../lib/mongodb');

const ObjectId = require('mongodb').ObjectId;

const handler: ApiQuery = async (req, res) => {
   switch (req.method) {
      case 'DELETE': {
         return deleteProduct(req, res);
      }
      case "PATCH": {
         return updateProduct(req, res);
      }
      default: {
         res.status(405).end(`Method ${req.method} is not allowed`)
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

const updateProduct: ApiQuery = async (req, res) => {
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
}

export default handler