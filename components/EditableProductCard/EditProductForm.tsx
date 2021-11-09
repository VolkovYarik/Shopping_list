import styles from "./EditableProductsCard.module.scss";
import React, { Dispatch, FC, FormEvent, SetStateAction, useEffect, useState } from "react";
import { editProductByID } from "axiosApi";
import { ProductForm } from "types/axiosApiTypes";
import { Category, Dictionary, Product } from "types/dataTypes";
import { Dropdown } from "../index";

interface EditProductFormProps {
   setToggled: Dispatch<SetStateAction<boolean>>;
   setLoading: Dispatch<SetStateAction<boolean>>;
   setCurrentProductState: Dispatch<SetStateAction<ProductForm>>
   currentProductState: ProductForm;
   item: Product;
   isToggled: boolean;
   categories: string[];
   categoriesData: Dictionary<Category>
   updatingProductList: { (): Promise<void> }
}

export const EditProductForm: FC<EditProductFormProps> =
   ({
       setToggled,
       currentProductState,
       item,
       setLoading,
       isToggled,
       setCurrentProductState,
       categories,
       categoriesData,
       updatingProductList
    }) => {

      const [selectedCategory, setSelectedCategory] = useState<string>(item.category)
      const [selectedSubCategory, setSelectedSubCategory] = useState<string>(item.class)
      const [isCategoriesDropdownActive, setCategoriesDropdownActive] = useState(false);
      const [isSubCategoriesDropdownActive, setSubCategoriesDropdownActive] = useState(false);
      const [subCategories, setSubCategories] = useState<string[] | []>([]);

      const submitUpdatedProduct = async (event: FormEvent<HTMLFormElement>) => {
         event.preventDefault();
         setLoading(true);
         await editProductByID(item._id, currentProductState)
         await updatingProductList()
            .finally(() => {
               setLoading(false)
            });
         setToggled(!isToggled)
      }

      useEffect(() => {
         setSubCategories(categoriesData[selectedCategory]?.subCategories || []);
         setSelectedSubCategory(categoriesData[selectedCategory]?.subCategories[0]);
      }, [selectedCategory]);

      useEffect(() => {
         setCurrentProductState((prev) => ({ ...prev, category: selectedCategory, class: selectedSubCategory }));
      }, [selectedCategory, selectedSubCategory]);

      return (
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
               <button className={styles.cancelBtn} onClick={(e) => {
                  e.preventDefault()
                  setToggled(!isToggled)
               }}>Cancel
               </button>
               <button className={styles.editBtn} type={'submit'}>Edit</button>
            </div>
         </form>
      )
   }
