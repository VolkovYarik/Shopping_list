import React, { FC, FormEvent, MouseEventHandler, useContext, useState } from "react";
import { Category, Dictionary, Product } from "types/dataTypes";
import styles from './EditableProductsCard.module.scss'
import { Context, removeFromStorage } from "../index";
import { ProductForm } from "types/axiosApiTypes";
import { deleteProductByID, editProductByID, uploadProductImage } from "axiosApi";
import { ContextType } from "types/contextTypes";
import { ProductCardFront } from "./ProductCardFront";
import { ProductCardBack } from "./ProductCardBack";
import cn from 'classnames'

interface EditDatabaseProductCardProps {
   item: Product;
   selectedCategory: string;
   selectedSubCategory: string;
   categories: string[];
   categoriesData: Dictionary<Category>;
   updatingProductList: { (): Promise<void> };
}

export const EditableProductsCard: FC<EditDatabaseProductCardProps> =
   ({
       item,
       selectedCategory,
       selectedSubCategory,
       updatingProductList,
       categoriesData,
       categories,
    }) => {
      const [isToggled, setToggled] = useState(false);
      const [isLoading, setLoading] = useState(false);
      const { dispatch, state } = useContext<ContextType>(Context);
      const [currentProductState, setCurrentProductState] = useState<ProductForm>({
         name: item.name,
         category: item.category,
         class: item.class
      })
      const [file, setFile] = useState<string | Blob>('')

      const toggleHandler: MouseEventHandler<HTMLDivElement | HTMLButtonElement> = (event) => {
         event.preventDefault()
         setToggled(!isToggled)
      }

      const clearUploading = (event: FormEvent) => {
         event.preventDefault()
         setFile('')
      }

      const uploadImage = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
         setLoading(true)
         event.preventDefault()
         const data: FormData = new FormData();
         data.append('file', file!)

         await uploadProductImage(data, item._id);
         await updatingProductList()
            .then((res) => {
               setFile('')
            })
            .finally(() => {
               setLoading(false)
            })
      }

      const fileHandler = (event: FormEvent<HTMLInputElement>): void => {
         event.preventDefault()
         if (event.currentTarget.files !== null) {
            setFile(event.currentTarget.files[0])
         }
      }

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

      const deleteProduct = async (product: Product) => {
         setLoading(true);
         await deleteProductByID(product._id)
         await updatingProductList()
            .finally(() => {
               setLoading(false)
            });
         if (state.storage.find((el) => el === product._id)) {
            dispatch(removeFromStorage(product._id));
         }
      };

      if (selectedCategory !== item.category && selectedCategory !== 'all') {
         return null;
      }
      if (selectedSubCategory !== item.class && selectedSubCategory !== 'all') {
         return null;
      }

      return (
         <div className={styles.flipper}>
            <div className={cn(styles.flipperFrontSide, { [styles.toggled]: isToggled })}>
               <ProductCardFront
                  toggleHandler={toggleHandler}
                  item={item}
                  uploadImage={uploadImage}
                  fileHandler={fileHandler}
                  file={file}
                  clearUploading={clearUploading}
                  deleteProduct={deleteProduct}
                  isLoading={isLoading}
               />
            </div>
            <div className={cn(styles.flipperBackSide, { [styles.toggled]: isToggled })}>
               <ProductCardBack
                  toggleHandler={toggleHandler}
                  setCurrentProductState={setCurrentProductState}
                  currentProductState={currentProductState}
                  item={item}
                  categories={categories}
                  categoriesData={categoriesData}
                  isLoading={isLoading}
                  submitUpdatedProduct={submitUpdatedProduct}
               />
            </div>
         </div>
      )
   }