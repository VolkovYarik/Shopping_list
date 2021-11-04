import { ApiQuery } from "types/NextApiTypes";

const { connectToDatabase } = require('../../../lib/mongodb');

const ObjectId = require('mongodb').ObjectId;

const handler: ApiQuery = async (req, res) => {
   switch (req.method) {
      case "GET": {
         return getCategories(req, res);
      }
      case "POST": {
         return addCategory(req, res);
      }
   }
}

const addCategory: ApiQuery = async (req, res) => {
   try {
      let { db } = await connectToDatabase();
      await db.collection('categories').insertOne(req.body);

      return res.json({
         message: "Category added successfully",
         success: true,
      });
   } catch (error: any) {
      return res.json({
         message: new Error(error).message,
         success: false,
      });
   }
}

const getCategories: ApiQuery = async (req, res) => {
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
}

export default handler