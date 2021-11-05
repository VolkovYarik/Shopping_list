import { Category, Product } from "./dataTypes";

enum Keys {
   ID = "_id",
   CATEGORY = "category"
}

type Key = Keys.ID | Keys.CATEGORY

type Data = Product | Category

export {
   Key,
   Data,
   Keys
}