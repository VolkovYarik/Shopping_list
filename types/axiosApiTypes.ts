import { ICategory, IProduct } from "./dataTypes";

type CategoriesResponseType = {
   data: ICategory[] | []
   success: string
}


type ProductsResponseType = {
   data: IProduct[] | []
   success: string
}

export {
   CategoriesResponseType,
   ProductsResponseType
}