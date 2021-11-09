import { Category, Product } from "./dataTypes";

export enum Keys {
   ID = "_id",
   CATEGORY = "category"
}

export type Key = Keys.ID | Keys.CATEGORY

export type Data = Product | Category