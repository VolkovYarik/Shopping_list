import styles from "./Categories.module.scss";
import { FC, useRef, useState, Dispatch, SetStateAction } from "react";
import cn from "classnames";
import ArrowDown from "../Specs/arrowDown";
import { useOnClickOutside } from "../Hooks/useOnClickOutside";
import { ICategory } from "../../types/dataTypes";

interface CategoriesProps {
   categoriesData: ICategory[] | [];
   selectedCategory: string;
   setSelectedCategory: Dispatch<SetStateAction<string>>
}

export const Categories: FC<CategoriesProps> = ({ categoriesData, setSelectedCategory, selectedCategory }) => {
   const [isDropdownActive, setDropdownActive] = useState(false);
   const ref = useRef(null);

   useOnClickOutside(ref, () => setDropdownActive(false));

   return (
      <>
         <div className={styles.categoriesDropdown} onClick={() => setDropdownActive(!isDropdownActive)} ref={ref}>
            <div className={styles.selectedItem}>
               {selectedCategory}
               <ArrowDown className={cn(styles.icon, { [styles.active]: isDropdownActive })} />
            </div>
            <ul className={cn({ [styles.dropdownActive]: isDropdownActive })}>
               <li className={styles.dropdownCategory} key={'all'} onClick={() => setSelectedCategory('all')}>all</li>
               {categoriesData.map((item) => (
                  <li onClick={() => setSelectedCategory(item.category)}
                      className={styles.dropdownCategory} key={item._id}>{item.category}</li>
               ))}
            </ul>
         </div>
         <ul className={styles.categories}>
            <li
               onClick={() => setSelectedCategory('all')}
               className={cn(styles.category, { [styles.selected]: selectedCategory === 'all' })}
            >
               All
            </li>
            {categoriesData.map((item) => (
               <li
                  key={item._id}
                  onClick={() => setSelectedCategory(item.category)}
                  className={cn(styles.category, { [styles.selected]: selectedCategory === item.category })}
               >
                  {item.category}
               </li>
            ))}
         </ul>
      </>
   );
};