import React, { FC, MouseEventHandler, useState } from "react";
import { Category, Dictionary, Product } from "types/dataTypes";
import styles from './EditableProductsCard.module.scss'
import { ProductCardFront } from "./ProductCardFront";
import { ProductCardBack } from "./ProductCardBack";
import cn from 'classnames'

interface EditDatabaseProductCardProps {
   item: Product;
   selectedCategory: string;
   selectedSubCategory: string;
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
    }) => {
      const [isToggled, setToggled] = useState(false);

      const toggleHandler: MouseEventHandler<HTMLDivElement | HTMLButtonElement> = (event) => {
         event.preventDefault()
         setToggled(!isToggled)
      }

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
                  updatingProductList={updatingProductList}
               />
            </div>
            <div className={cn(styles.flipperBackSide, { [styles.toggled]: isToggled })}>
               <ProductCardBack
                  toggleHandler={toggleHandler}
                  setToggled={setToggled}
                  item={item}
                  categoriesData={categoriesData}
                  updatingProductList={updatingProductList}
               />
            </div>
         </div>
      )
   }