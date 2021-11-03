import styles from './ProductCard.module.scss';
import { FC, useContext, useEffect, useState } from "react";
import cn from 'classnames';
import Image from "next/image";
import noImage from 'assets/noImage.jpg';
import { IProduct } from "../../types/dataTypes";
import { IContext } from "../../types/contextTypes";
import { Context } from "../Context";
import { BasketFunctionType } from "../../pages/shoppingList";

interface ProductsCardProps {
   item: IProduct
   selectedCategory: string
   selectedSubCategory: string
   basket: IProduct[] | []
   removeFromBasket: BasketFunctionType
   addToBasket: BasketFunctionType
}

export const ProductsCard: FC<ProductsCardProps> =
   ({
       item,
       selectedCategory,
       selectedSubCategory,
       basket,
       removeFromBasket,
       addToBasket
    }) => {
      const [isSelected, setSelected] = useState(false);
      const { state } = useContext<IContext>(Context);

      useEffect(() => {
         if (state.storage.find((el) => el === item._id)) {
            setSelected(true);
         }
         if (!basket.find((el) => el?._id === item._id)) {
            setSelected(false);
         }

      }, [state, basket]);

      const changeBasket = () => {
         setSelected(!isSelected);
         if (!isSelected) {
            addToBasket(item);
         } else {
            removeFromBasket(item);
         }
      };

      if (selectedCategory !== item.category && selectedCategory !== 'all') {
         return null;
      }
      if (selectedSubCategory !== item.class && selectedSubCategory !== 'all') {
         return null;
      }

      return (
         <li className={styles.productsCardWrapper}>
            <div onClick={changeBasket}
                 className={cn(styles.productsCard, { [styles.selected]: isSelected })}>
               <div className={styles.imgWrapper}>
                  <Image src={noImage} layout={'fill'} />
               </div>
               <div className={cn(styles.productsName, { [styles.selected]: isSelected })}><span>{item.name}</span>
               </div>
            </div>
         </li>
      );
   };