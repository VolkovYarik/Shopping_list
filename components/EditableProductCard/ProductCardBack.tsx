import React, { Dispatch, FC, FormEvent, MouseEventHandler, SetStateAction, useEffect, useState } from "react";
import { ProductForm } from "types/axiosApiTypes";
import { Category, Dictionary, Product } from "types/dataTypes";
import cn from "classnames";
import styles from "./EditableProductsCard.module.scss";
import { Dropdown } from "../Dropdown/Dropdown";

interface ProductCardBackProps {
   setCurrentProductState: Dispatch<SetStateAction<ProductForm>>
   currentProductState: ProductForm;
   item: Product;
   categories: string[];
   categoriesData: Dictionary<Category>
   isLoading: boolean;
   submitUpdatedProduct: { (event: FormEvent<HTMLFormElement>): Promise<void> }
   toggleHandler: MouseEventHandler<HTMLButtonElement>
}

export const ProductCardBack: FC<ProductCardBackProps> =
   ({
       toggleHandler,
       currentProductState,
       setCurrentProductState,
       categories,
       submitUpdatedProduct,
       isLoading,
       item,
       categoriesData,

    }) => {

      const [selectedCategory, setSelectedCategory] = useState<string>(item.category)
      const [selectedSubCategory, setSelectedSubCategory] = useState<string>(item.class)
      const [isCategoriesDropdownActive, setCategoriesDropdownActive] = useState(false);
      const [isSubCategoriesDropdownActive, setSubCategoriesDropdownActive] = useState(false);
      const [subCategories, setSubCategories] = useState<string[] | []>([]);


      useEffect(() => {
         setSubCategories(categoriesData[selectedCategory]?.subCategories || []);
         setSelectedSubCategory(categoriesData[selectedCategory]?.subCategories[0]);
      }, [selectedCategory]);

      useEffect(() => {
         setCurrentProductState((prev) => ({ ...prev, category: selectedCategory, class: selectedSubCategory }));
      }, [selectedCategory, selectedSubCategory]);

      return (
         <div className={styles.productsCardBack}>
            <div className={cn(styles.loader, { [styles.active]: isLoading })}>Updating...</div>
            <form className={styles.editProductForm} onSubmit={submitUpdatedProduct}>
               <div className={styles.inputWrapper}>
                  <span>Name</span>
                  <input
                     value={currentProductState.name}
                     onChange={e => setCurrentProductState({ ...currentProductState, name: e.target.value })}
                     type={"text"}
                     className={styles.input}
                  />
               </div>
               <div className={styles.inputWrapper}>
                  <span>Category</span>
                  <Dropdown
                     selectedValue={selectedCategory}
                     setDropdownActive={setCategoriesDropdownActive}
                     data={categories}
                     setValue={setSelectedCategory}
                     isDropdownActive={isCategoriesDropdownActive}
                     withInitialValue={false}
                  />
               </div>
               <div className={styles.inputWrapper}>
                  <span>Subcatergory</span>
                  <Dropdown
                     selectedValue={selectedSubCategory}
                     setDropdownActive={setSubCategoriesDropdownActive}
                     data={subCategories}
                     setValue={setSelectedSubCategory}
                     isDropdownActive={isSubCategoriesDropdownActive}
                     withInitialValue={false}
                  />
               </div>
               <div className={styles.formActions}>
                  <button className={styles.cancelBtn} onClick={toggleHandler}>
                     Cancel
                  </button>
                  <button className={styles.editBtn} type={'submit'}>Edit</button>
               </div>
            </form>
         </div>
      )
   }