import { FormEvent, useEffect, useState } from "react";
import { ProductForm } from "types/axiosApiTypes";
import { UseProductForm } from "types/hooksTypes";

export const useProductForm: UseProductForm = (selectedCategory, selectedSubCategory, initialState) => {

   const [currentProductState, setCurrentProductState] = useState<ProductForm>(initialState)

   const productNameHandler = (event: FormEvent<HTMLInputElement>) => {
      setCurrentProductState({ ...currentProductState, name: event.currentTarget.value })
   }

   useEffect(() => {
      setCurrentProductState((prev) => ({ ...prev, category: selectedCategory, class: selectedSubCategory }));
   }, [selectedCategory, selectedSubCategory]);

   return {
      productNameHandler,
      currentProductState
   }
}