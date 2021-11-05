import Image from "next/image";
import noImage from "assets/noImage.jpg";
import React, { FC } from "react";
import { Product } from "types/dataTypes";
import styles from './EditDatabaseProductsCard.module.scss'

interface EditDatabaseProductCardProps {
   item: Product;
   deleteProduct: (product: Product) => void;
   selectedCategory: string;
   selectedSubCategory: string;
}

export const EditDatabaseProductsCard: FC<EditDatabaseProductCardProps> =
   ({
       item,
       deleteProduct,
       selectedCategory,
       selectedSubCategory
    }) => {

      if (selectedCategory !== item.category && selectedCategory !== 'all') {
         return null;
      }
      if (selectedSubCategory !== item.class && selectedSubCategory !== 'all') {
         return null;
      }

      return (
         <div className={styles.editDatabaseProductsCard} key={item._id}>
            <div className={styles.imgWrapper}>
               <Image src={noImage} layout={'fill'} />
            </div>
            <div className={styles.editDatabaseProductsCardInfo}>{item.name}</div>
            <div className={styles.editDatabaseProductsCardInfo}>{item.category}</div>
            <div className={styles.editDatabaseProductsCardInfo}>{item.class}</div>
            <div className={styles.editDatabaseProductsCardActions}>
               <button onClick={() => deleteProduct(item)}>Delete</button>
            </div>
         </div>
      )
   }