const { connectToDatabase } = require('../../../lib/mongodb');

const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
   switch (req.method) {
      case "GET": {
         return getCategories(req, res);
      }
      case "POST": {
         return addCategory(req, res);
      }
   }
}

async function addCategory(req, res) {
   try {
      let { db } = await connectToDatabase();
      await db.collection('categories').insertOne(req.body);

      return res.json({
         message: "Category added successfully",
         success: true,
      });
   } catch (error) {
      return res.json({
         message: new Error(error).message,
         success: false,
      });
   }
}

async function getCategories(req, res) {
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
   } catch (error) {
      return res.json({
         message: new Error(error).message,
         success: false,
      });
   }
}