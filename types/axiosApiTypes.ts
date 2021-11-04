import { Category, Product } from "./dataTypes";

type CategoriesResponse = {
   data: Category[] | []
   success: string
}


type ProductsResponse = {
   data: Product[] | []
   success: string
}

export {
   CategoriesResponse,
   ProductsResponse
}