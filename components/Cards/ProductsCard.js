import styles from './Cards.module.scss';
import { useEffect, useState } from "react";
import cn from 'classnames';
import { useBucket } from "/components/Hooks/useBucket";
import Image from "next/image";
import noImage from 'assets/noImage.jpg';

export const ProductsCard = ({ item, selectedCategory, state, selectedSubCategory }) => {
   const [isSelected, setSelected] = useState(false);
   const { addToBucket, removeFromBucket } = useBucket();

   useEffect(() => {
      if (state.storage.find((el) => el === item._id)) {
         setSelected(true);
      }
      if (!state.bucket.find((el) => el?._id === item._id)) {
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
               <Image src={noImage} layout={'fill'} />
            </div>
            <div className={cn(styles.productsName, { [styles.selected]: isSelected })}><span>{item.name}</span></div>
         </div>
      </li>
   );
};