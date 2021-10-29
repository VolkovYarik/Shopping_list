import { useContext, useEffect } from "react";
import { Context } from "../Context";

export const StorageObserver = () => {
   const { state } = useContext(Context);
   useEffect(() => {
      localStorage.setItem('products', JSON.stringify(state.storage));
   }, [state.storage]);
   return null;
};