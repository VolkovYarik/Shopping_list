const { connectToDatabase } = require('../../../lib/mongodb');

const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
   switch (req.method) {
      case 'DELETE': {
         return deleteProduct(req, res);
      }
   }
}

async function deleteProduct(req, res) {
   try {
      let { db } = await connectToDatabase();
      await db.collection('products').deleteOne({
         _id: new ObjectId(req.query.id)
      });

      return res.json({
         message: 'Product deleted successfully',
         success: true,
      });
   } catch (error) {

      return res.json({
         message: new Error(error).message,
         success: false,
      });
   }
}