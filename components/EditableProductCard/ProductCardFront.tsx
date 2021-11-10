import cn from "classnames";
import styles from "./EditableProductsCard.module.scss";
import Image from "next/image";
import checkIcon from "assets/check.png";
import cancel from "assets/cancel.png";
import { Edit, Plus } from "../index";
import React, { FC, FormEvent, MouseEventHandler } from "react";
import { Product } from "types/dataTypes";
import noImage from "assets/noImage.jpg";

const DEV_URL: string = process.env.DEV_URL || "http://localhost:3000";

interface ProductCardFrontProps {
   item: Product;
   clearUploading: { (event: FormEvent): void };
   deleteProduct: { (product: Product): Promise<void> };
   toggleHandler: MouseEventHandler<HTMLDivElement>;
   isLoading: boolean;
   fileHandler: { (event: FormEvent<HTMLInputElement>): void };
   uploadImage: { (event: FormEvent<HTMLFormElement>): Promise<void> };
   file: any
}

export const ProductCardFront: FC<ProductCardFrontProps> =
   ({
       item,
       clearUploading,
       deleteProduct,
       toggleHandler,
       isLoading,
       fileHandler,
       uploadImage,
       file
    }) => {
      const productImage = item.image !== undefined ? DEV_URL + item.image : noImage;

      return (

         <div className={styles.productsCardFront} key={item._id}>
            <div
               className={cn(styles.loader, { [styles.active]: isLoading })}>
               {file ? "Changing image..." : "Deleting..."}
            </div>
            <div className={styles.imgWrapper}>
               <Image src={file ? URL.createObjectURL(file) : productImage} layout={'fill'} />
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
               <div className={styles.iconWrapper} onClick={toggleHandler}>
                  <Edit className={styles.icon} />
               </div>
               <button
                  className={cn({ [styles.disabled]: !!file })}
                  disabled={!!file}
                  onClick={() => deleteProduct(item)}
               >
                  Delete
               </button>
            </div>
         </div>
      )
   }