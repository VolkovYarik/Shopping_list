import { Category, Product } from "./dataTypes";

type CategoriesResponse = {
   data: Category[] | []
   success: string
}


type ProductsResponse = {
   data: Product[] | []
   success: string
}

type ProductForm = {
   name: string;
   category: string;
   class: string
}

type CategoryForm = {
   category: string;
   subCategories: string[];
}

export {
   CategoriesResponse,
   ProductsResponse,
   ProductForm,
   CategoryForm
}