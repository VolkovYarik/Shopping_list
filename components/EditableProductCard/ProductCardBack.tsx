import React, { Dispatch, FC, FormEvent, MouseEventHandler, SetStateAction, useState } from "react";
import { Category, Dictionary, Product } from "types/dataTypes";
import cn from "classnames";
import styles from "./EditableProductsCard.module.scss";
import { Dropdown } from "../Dropdown/Dropdown";
import { editProductByID } from "axiosApi";
import { useProductAttributes } from "components";

interface ProductCardBackProps {
   item: Product;
   categoriesData: Dictionary<Category>
   updatingProductList: { (): Promise<void> };
   toggleHandler: MouseEventHandler<HTMLButtonElement>;
   setToggled: Dispatch<SetStateAction<boolean>>;
}

export const ProductCardBack: FC<ProductCardBackProps> =
   ({
       toggleHandler,
       item,
       categoriesData,
       updatingProductList,
       setToggled,
    }) => {

      const [isLoading, setLoading] = useState(false);

      const submitUpdatedProduct = async (event: FormEvent<HTMLFormElement>) => {
         event.preventDefault();
         setLoading(true);
         await editProductByID(item._id, currentProductState)
         await updatingProductList()
            .finally(() => {
               setLoading(false)
            });
         setToggled(false)
      }

      const {
         currentProductState,
         productNameHandler,
         selectedSubCategory,
         subCategories,
         setSelectedSubCategory,
         selectedCategory,
         setSelectedCategory
      } = useProductAttributes(categoriesData, true, item);

      return (
         <div className={styles.productsCardBack}>
            <div className={cn(styles.loader, { [styles.active]: isLoading })}>Updating...</div>
            <form className={styles.editProductForm} onSubmit={submitUpdatedProduct}>
               <div className={styles.inputWrapper}>
                  <span>Name</span>
                  <input
                     value={currentProductState.name}
                     onChange={productNameHandler}
                     type={"text"}
                     className={styles.input}
                  />
               </div>
               <div className={styles.inputWrapper}>
                  <span>Category</span>
                  <Dropdown
                     selectedValue={selectedCategory}
                     data={Object.keys(categoriesData)}
                     setValue={setSelectedCategory}
                     withInitialValue={false}
                  />
               </div>
               <div className={styles.inputWrapper}>
                  <span>Subcatergory</span>
                  <Dropdown
                     selectedValue={selectedSubCategory}
                     data={subCategories}
                     setValue={setSelectedSubCategory}
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