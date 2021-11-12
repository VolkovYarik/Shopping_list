import cn from "classnames";
import styles from "./EditableProductsCard.module.scss";
import Image from "next/image";
import checkIcon from "assets/check.png";
import cancel from "assets/cancel.png";
import { Context, Edit, Plus, removeFromStorage } from "../index";
import React, { FC, FormEvent, MouseEventHandler, useContext, useState } from "react";
import { Product } from "types/dataTypes";
import noImage from "assets/noImage.jpg";
import { deleteProductByID, uploadProductImage } from "axiosApi";
import { ContextType } from "types/contextTypes";
import { cleanupFileUploading, fileHandler } from "components";

const DEV_URL: string = process.env.DEV_URL || "http://localhost:3000";

interface ProductCardFrontProps {
   item: Product;
   toggleHandler: MouseEventHandler<HTMLDivElement>;
   updatingProductList: { (): Promise<void> }
}

export const ProductCardFront: FC<ProductCardFrontProps> =
   ({
       item,
       toggleHandler,
       updatingProductList
    }) => {
      const productImage = item.image !== undefined ? DEV_URL + item.image : noImage;
      const [image, setImage] = useState<string | Blob>('')
      const { dispatch, state } = useContext<ContextType>(Context);
      const [isLoading, setLoading] = useState(false);

      const uploadImage = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
         event.preventDefault()
         setLoading(true)
         const data: FormData = new FormData();
         data.append('file', image!)

         await uploadProductImage(data, item._id);
         await updatingProductList()
            .then((res) => {
               setImage('')
            })
            .finally(() => {
               setLoading(false)
            })
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

      return (
         <div className={styles.productsCardFront} key={item._id}>
            <div
               className={cn(styles.loader, { [styles.active]: isLoading })}>
               {image ? "Changing image..." : "Deleting..."}
            </div>
            <div className={styles.imgWrapper}>
               <Image src={image ? URL.createObjectURL(image) : productImage} layout={'fill'} />
               <form onSubmit={uploadImage}>
                  {image
                     ?
                     <div className={styles.uploadActions}>
                        <button type={'submit'}><Image src={checkIcon} width={20} height={20} /></button>
                        <button onClick={(event) => cleanupFileUploading(event, setImage)}>
                           <Image src={cancel} width={20} height={20} />
                        </button>
                     </div>
                     :
                     <>
                        <input id={item._id} type='file' onChange={(event) => fileHandler(event, setImage)} />
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
               <div className={styles.iconWrapper} onClick={toggleHandler}>
                  <Edit className={styles.icon} />
               </div>
               <button
                  className={cn({ [styles.disabled]: !!image })}
                  disabled={!!image}
                  onClick={() => deleteProduct(item)}
               >
                  Delete
               </button>
            </div>
         </div>
      )
   }