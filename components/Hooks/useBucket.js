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
      dispatch(addToStorage(product._id));
   };

   const removeFromBucket = (product) => {
      dispatch(removeProduct(product));
      dispatch(removeFromStorage(product._id));
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