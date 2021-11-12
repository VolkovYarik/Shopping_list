import { ChangeEventHandler, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { Category, Dictionary } from "../../types/dataTypes";
import { ProductForm } from "../../types/axiosApiTypes";

type useProductAttributesResult = {
   selectedSubCategory: string;
   selectedCategory: string;
   subCategories: string[];
   currentProductState: ProductForm;
   setSelectedSubCategory: Dispatch<SetStateAction<string>>;
   setSelectedCategory: Dispatch<SetStateAction<string>>;
   productNameHandler: ChangeEventHandler<HTMLInputElement>
}

type UseProductAttributes = (categoriesData: Dictionary<Category>, isProductEditing: boolean, item?: ProductForm) => useProductAttributesResult

export const useProductAttributes: UseProductAttributes = (categoriesData, isProductEditing, item?) => {

   const initialCategory: string = isProductEditing ? Object.keys(categoriesData)[0] : 'all';
   const initialSubCategory: string = Object.values(categoriesData)[0].subCategories[0];

   const [selectedCategory, setSelectedCategory] = useState<string>(item ? item.category : initialCategory);
   const [selectedSubCategory, setSelectedSubCategory] = useState<string>(item ? item.class : initialSubCategory);
   const [subCategories, setSubCategories] = useState<string[] | []>([]);

   const [currentProductState, setCurrentProductState] = useState<ProductForm>({
      name: item ? item.name : '',
      category: item ? item.category : initialCategory,
      class: item ? item.class : initialSubCategory,
   })

   const productNameHandler = (event: FormEvent<HTMLInputElement>) => {
      setCurrentProductState({ ...currentProductState, name: event.currentTarget.value })
   }

   useEffect(() => {
      if (isProductEditing) {
         setSelectedSubCategory(categoriesData[selectedCategory]?.subCategories[0]);
      } else {
         setSelectedSubCategory('all');
      }
      setSubCategories(categoriesData[selectedCategory]?.subCategories || []);
   }, [selectedCategory]);


   useEffect(() => {
      if (isProductEditing) {
         setCurrentProductState((prev) => ({ ...prev, category: selectedCategory, class: selectedSubCategory }));
      }
   }, [selectedCategory, selectedSubCategory]);

   return {
      selectedSubCategory,
      subCategories,
      currentProductState,
      setSelectedSubCategory,
      productNameHandler,
      selectedCategory,
      setSelectedCategory
   }
}