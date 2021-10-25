import {
   addProduct,
   addToStorage,
   clearBucket,
   clearStorage,
   Context,
   removeFromStorage,
   removeProduct
} from "../Context";
import { useContext } from "react";


export const useBucket = () => {
   const { dispatch } = useContext(Context);

   const addToBucket = (product) => {
      dispatch(addProduct(product));
      dispatch(addToStorage(product.id));
   };

   const removeFromBucket = (product) => {
      dispatch(removeProduct(product));
      dispatch(removeFromStorage(product));
   };

   const clearBucketAndStorage = () => {
      dispatch(clearBucket());
      dispatch(clearStorage());
   };
   return {
      removeFromBucket,
      addToBucket,
      clearBucketAndStorage
   };

};