import styles from './Cards.module.scss';
import { ProductsCard } from "./ProductsCard";
import { useContext } from "react";
import { Context } from "../Context";

export const Cards = ({ productsData, selectedCategory, selectedSubCategory }) => {
   const { state } = useContext(Context);

   return (
      <ul className={styles.cards}>
         {productsData.map((item) => (
            <ProductsCard
               state={state}
               item={item}
               key={item.id}
               selectedCategory={selectedCategory}
               selectedSubCategory={selectedSubCategory} />
         ))}
      </ul>
   );
};