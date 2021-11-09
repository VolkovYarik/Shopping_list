import Image from "next/image";
import noImage from "assets/noImage.jpg";
import React, { Dispatch, FC, FormEvent, useContext, useState } from "react";
import { Category, Product } from "types/dataTypes";
import styles from './EditableProductsCard.module.scss'
import cn from 'classnames'
import { Context, Dictionary, Edit, Plus, removeFromStorage } from "../index";
import { ProductForm } from "types/axiosApiTypes";
import { deleteProductByID, uploadProductImage } from "axiosApi";
import { ContextType } from "types/contextTypes";
import { EditProductForm } from "./EditProductForm";
import checkIcon from 'assets/check.png'
import cancel from 'assets/cancel.png'

interface EditDatabaseProductCardProps {
   item: Product;
   selectedCategory: string;
   selectedSubCategory: string;
   setProducts: Dispatch<React.SetStateAction<[] | Product[]>>;
   categories: string[];
   categoriesData: Dictionary<Category>;
   updatingProductList: { (): Promise<void> }
}

export const EditableProductsCard: FC<EditDatabaseProductCardProps> =
   ({
       item,
       selectedCategory,
       selectedSubCategory,
       updatingProductList,
       categoriesData,
       categories
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

      const fileHandler = (event: FormEvent<HTMLInputElement>) => {
         event.preventDefault()
         if (event.currentTarget.files !== null) {
            setFile(event.currentTarget.files[0])
         }
      }

      const clearUploading = (event: FormEvent) => {
         event.preventDefault()
         setFile('')
      }

      const uploadImage = async (event: FormEvent<HTMLFormElement>) => {
         event.preventDefault()
         const data: FormData = new FormData();
         data.append('file', file!)

         await uploadProductImage(data)
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
            <div className={cn(styles.loader, { [styles.active]: isLoading })}>Deleting</div>
            <div className={cn(styles.productsCardFront, { [styles.toggled]: isToggled })} key={item._id}>
               <div className={styles.imgWrapper}>
                  <Image src={file ? URL.createObjectURL(file) : noImage} layout={'fill'} />
                  <form onSubmit={uploadImage}>
                     {file
                        ?
                        <div className={styles.uploadActions}>
                           <button type={'submit'}><Image src={checkIcon} width={20} height={20} /></button>
                           <button onClick={clearUploading}><Image src={cancel} width={20} height={20} /></button>
                        </div>
                        :
                        <>
                           <input id={item._id} type='file' onChange={fileHandler} />
                           <label htmlFor={item._id} className="custom-file-upload">
                              <Plus className={styles.icon} />
                           </label>
                        </>
                     }
                  </form>
               </div>
               <div className={styles.productsCardInfo}>{item.name}</div>
               <div className={styles.productsCardInfo}>{item.category}</div>
               <div className={styles.productsCardInfo}>{item.class}</div>
               <div className={styles.productsCardActions}>
                  <div className={styles.iconWrapper} onClick={() => setToggled(!isToggled)}>
                     <Edit className={styles.icon} />
                  </div>
                  <button onClick={() => deleteProduct(item)}>Delete</button>
               </div>
            </div>
            <div className={cn(styles.productsCardBack, { [styles.toggled]: isToggled })}>
               <div className={cn(styles.loader, { [styles.active]: isLoading })}>Updating...</div>
               <EditProductForm
                  setToggled={setToggled}
                  currentProductState={currentProductState}
                  item={item} setLoading={setLoading}
                  isToggled={isToggled}
                  setCurrentProductState={setCurrentProductState}
                  categoriesData={categoriesData}
                  categories={categories}
                  updatingProductList={updatingProductList}
               />
            </div>
         </div>
      )
   }