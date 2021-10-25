import styles from './ProductsCard.module.scss';
import { useEffect, useState } from "react";
import cn from 'classnames';
import { useBucket } from "/components/Hooks/useBucket";
import Image from "next/image";

export const ProductsCard = ({ item, selectedCategory, state, selectedSubCategory }) => {
   const [isSelected, setSelected] = useState(false);
   const { addToBucket, removeFromBucket } = useBucket();

   useEffect(() => {
      if (state.storage.find((el) => el === item.id)) {
         setSelected(true);
      }
      if (!state.bucket.find((el) => el?.id === item.id)) {
         setSelected(false);
      }

   }, [state]);

   const changeBucket = () => {
      setSelected(!isSelected);
      if (!isSelected) {
         addToBucket(item);
      } else {
         removeFromBucket(item);
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
         <div onClick={changeBucket}
              className={cn(styles.productsCard, { [styles.selected]: isSelected })}>
            <div className={styles.imgWrapper}>
               <Image src={item.imgUrl} layout={'fill'} />
            </div>
            <div className={styles.productsName}>{item.name}</div>
         </div>
      </li>
   );
};