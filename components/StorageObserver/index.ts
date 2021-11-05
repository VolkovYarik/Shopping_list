import { useContext, useEffect } from "react";
import { Context } from "components";
import { ContextType } from "types/contextTypes";

export const StorageObserver = () => {
   const { state } = useContext<ContextType>(Context);
   useEffect(() => {
      localStorage.setItem('products', JSON.stringify(state.storage));
   }, [state.storage]);
   return null;
};