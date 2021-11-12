import { Category, Product } from "./dataTypes";

export type CategoriesResponse = {
   data: Category[] | []
   success: string
}

export type ProductsResponse = {
   data: Product[] | []
   success: string
}

export type ProductForm = {
   name: string;
   category: string;
   class: string
}

export type CategoryForm = {
   category: string;
   subCategories: string[];
}