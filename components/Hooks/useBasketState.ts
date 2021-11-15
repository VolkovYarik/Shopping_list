import { addToStorage, clearStorage, removeFromStorage } from "../Context/storageReducer";
import { useContext, useEffect, useState } from "react";
import { ContextType } from "types/contextTypes";
import { Context } from "../Context";
import {  Product } from "types/dataTypes";
import { UpdateBasket, UpdateTypes, UseBasketState } from "types/hooksTypes";

export const useBasketState: UseBasketState = (productsData) => {
   const { state, dispatch } = useContext<ContextType>(Context);
   const [basket, setBasket] = useState<Product[] | []>([]);

   const updateBasket: UpdateBasket = (updateType, product) => {
      if (updateType === UpdateTypes.ADD_PRODUCT && product) {
         dispatch(addToStorage(product._id));
         setBasket((prev) => [...prev, product]);
      }
      if (updateType === UpdateTypes.REMOVE_PRODUCT && product) {
         dispatch(removeFromStorage(product._id));
         setBasket((prev) => prev.filter((item) => item._id !== product._id));
      }
      if (updateType === UpdateTypes.CLEANUP_BASKET) {
         dispatch(clearStorage());
         setBasket([]);
      }
   }

   useEffect(() => {
      setBasket(state.storage.map((element) => productsData[element]));
   }, []);

   return { basket, updateBasket }
}