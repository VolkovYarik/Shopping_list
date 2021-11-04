import { ApiQuery } from "types/NextApiTypes";

const { connectToDatabase } = require('../../../lib/mongodb');

const ObjectId = require('mongodb').ObjectId;

const handler: ApiQuery = async (req, res) => {
   switch (req.method) {

      case 'GET': {
         return getProducts(req, res);
      }

      case 'POST': {
         return addProduct(req, res);
      }
   }
}

const addProduct: ApiQuery = async (req, res) => {
   try {
      let { db } = await connectToDatabase();
      await db.collection('products').insertOne(req.body);

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
}

const getProducts: ApiQuery = async (req, res) => {
   try {
      let { db } = await connectToDatabase();
      let products = await db
         .collection('products')
         .find({})
         .sort({ published: -1 })
         .toArray();
      return res.json({
         data: JSON.parse(JSON.stringify(products)),
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