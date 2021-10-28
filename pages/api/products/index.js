const { connectToDatabase } = require('../../../lib/mongodb');

const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
   switch (req.method) {

      case 'GET': {
         return getProducts(req, res);
      }

      case 'POST': {
         return addProduct(req, res);
      }
   }
}

async function addProduct(req, res) {
   try {
      let { db } = await connectToDatabase();
      await db.collection('products').insertOne(req.body);

      return res.json({
         message: "Product added successfully",
         success: true
      });
   } catch (error) {
      return res.json({
         message: new Error(error).message,
         success: false
      });
   }
}

async function getProducts(req, res) {
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
   } catch (error) {
      return res.json({
         message: new Error(error).message,
         success: false,
      });
   }
}