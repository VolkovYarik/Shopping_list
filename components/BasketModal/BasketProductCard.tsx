import styles from './BasketModal.module.scss';
import { FC } from "react";
import { Product } from "types/dataTypes";
import Image from "next/image";
import noImage from "assets/noImage.jpg";
import { UpdateBasket } from "pages/shoppingList";

const DEV_URL: string = process.env.DEV_URL || "http://localhost:3000";

interface BasketProductCardProps {
   item: Product;
   removeFromBasket: UpdateBasket
}

export const BasketProductCard: FC<BasketProductCardProps> = ({item, removeFromBasket}) => {
   const productImage = item.image !== undefined ? DEV_URL + item.image : noImage

   return (
      <li key={item?._id} className={styles.productsCardWrapper}>
         <div className={styles.productsCard}>
            <div className={styles.imgWrapper}>
               <Image src={item.image ? productImage : noImage} layout={'fill'} />
            </div>
            <span>{item?.name}</span>
            <button onClick={() => removeFromBasket(item)} />
         </div>
      </li>
   )
}