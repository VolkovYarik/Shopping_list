import styles from "./Categories.module.scss";
import { ProductsCategory } from "./ProductsCategory";
import { useRef, useState } from "react";
import cn from "classnames";
import ArrowDown from "../Specs/arrowDown";
import { useOnClickOutside } from "../Hooks/useOnClickOutside";

export const Categories = ({ categoriesData, setSelectedCategory, selectedCategory }) => {
   const [isDropdownActive, setDropdownActive] = useState(false);
   const ref = useRef();

   useOnClickOutside(ref, () => setDropdownActive(false));

   return (
      <>
         <div className={styles.categoriesDropdown} onClick={() => setDropdownActive(!isDropdownActive)} ref={ref}>
            <div className={styles.selectedItem}>{selectedCategory}
               <ArrowDown className={cn(styles.icon, { [styles.active]: isDropdownActive })} />
            </div>
            <ul className={cn({ [styles.dropdownActive]: isDropdownActive })}>
               <li className={styles.dropdownCategory} key={'all'} onClick={() => setSelectedCategory('all')}>all</li>
               {categoriesData.map((item) => (
                  <li onClick={() => setSelectedCategory(item.category)}
                      className={styles.dropdownCategory} key={item.category}>{item.category}</li>
               ))}
            </ul>
         </div>
         <ul className={styles.categories}>
            <ProductsCategory
               key={'all'}
               category={'all'}
               setSelectedCategory={setSelectedCategory}
               selectedCategory={selectedCategory} />
            {categoriesData.map((item) => (
               <ProductsCategory
                  key={item.category}
                  category={item.category}
                  setSelectedCategory={setSelectedCategory}
                  selectedCategory={selectedCategory} />
            ))}
         </ul>
      </>
   );
};