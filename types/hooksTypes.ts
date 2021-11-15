import { Category, Dictionary, Product } from "./dataTypes";
import { ProductForm } from "./axiosApiTypes";
import { Dispatch, FormEvent, SetStateAction } from "react";

export enum UpdateTypes {
   ADD_PRODUCT = 'ADD_PRODUCT',
   REMOVE_PRODUCT = 'REMOVE_PRODUCT',
   CLEANUP_BASKET = 'CLEANUP_BASKET'
}

export type UpdateBasket = (updateType: UpdateTypes, product?: Product) => void;
export type UseBasketState = (productsData: Dictionary<Product>) => { basket: Product[], updateBasket: UpdateBasket };

export type UseProductForm = (selectedCategory: string, selectedSubCategory: string, initialState: ProductForm) => {
   productNameHandler: (event: FormEvent<HTMLInputElement>) => void;
   currentProductState: ProductForm;
}

export type UseCategoriesState = (categoriesData: Dictionary<Category>, item?: ProductForm) => {
   selectedCategory: string,
   selectedSubCategory: string,
   setSelectedCategory: Dispatch<SetStateAction<string>>,
   setSelectedSubCategory: Dispatch<SetStateAction<string>>
   subCategories: string[],
}

