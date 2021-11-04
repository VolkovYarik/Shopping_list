import styles from "./CategoriesDropdown.module.scss";
import ArrowDown from "../Specs/ArrowDown";
import cn from "classnames";
import { Category } from "../../types/dataTypes";
import { Dispatch, FC, SetStateAction, useRef } from "react";
import { useOnClickOutside } from "../Hooks/useOnClickOutside";

interface CategoriesDropdownProps {
   setDropdownActive: Dispatch<SetStateAction<boolean>>;
   setSelectedCategory: Dispatch<SetStateAction<string>>
   isDropdownActive: boolean;
   selectedCategory: string;
   categoriesData: Category[] | []
}

export const CategoriesDropdown: FC<CategoriesDropdownProps> =
   ({
       selectedCategory,
       setDropdownActive,
       isDropdownActive,
       categoriesData,
       setSelectedCategory
    }) => {
      const ref = useRef(null);

      useOnClickOutside(ref, () => setDropdownActive(false));

      return (
         <div className={cn(styles.categoriesDropdown, { [styles.active]: isDropdownActive })}
              onClick={() => setDropdownActive(!isDropdownActive)} ref={ref}>
            <div className={cn(styles.selectedItem, { [styles.active]: isDropdownActive })}>
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
      )
   }