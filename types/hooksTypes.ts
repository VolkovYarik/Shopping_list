import { Product } from "./dataTypes";

export enum UpdateTypes {
   ADD_PRODUCT = 'ADD_PRODUCT',
   REMOVE_PRODUCT = 'REMOVE_PRODUCT',
   CLEANUP_BASKET = 'CLEANUP_BASKET'
}

export type UpdateBasket = (updateType: UpdateTypes, product?: Product) => void