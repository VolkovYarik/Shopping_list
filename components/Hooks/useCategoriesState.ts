import { useEffect, useState } from "react";
import { UseCategoriesState } from "types/hooksTypes";


export const useCategoriesState: UseCategoriesState = (categoriesData, item?) => {
   const initialCategoryValue: string = item ? item.category : 'all'
   const initialSubCategoryValue: string = item ? item.class : 'all';

   const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryValue);
   const [selectedSubCategory, setSelectedSubCategory] = useState<string>(initialSubCategoryValue);
   const [subCategories, setSubCategories] = useState<string[] | []>([]);

   useEffect(() => {
      if (!item) {
         setSelectedSubCategory('all')
      } else {
         setSelectedSubCategory(categoriesData[selectedCategory].subCategories[0])
      }
      setSubCategories(categoriesData[selectedCategory]?.subCategories || []);
   }, [selectedCategory]);

   useEffect(() => {
      if (item) {
         setSelectedSubCategory(item.class)
      }
   }, [])

   return {
      subCategories, selectedCategory, setSelectedCategory, selectedSubCategory, setSelectedSubCategory
   }
}
