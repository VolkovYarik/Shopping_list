import styles from './SubcategoriesDropdown.module.scss';
import ArrowDown from "../Specs/ArrowDown";
import cn from "classnames";
import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { useOnClickOutside } from "components/Hooks/useOnClickOutside";

interface SubCategoriesDropdownProps {
   selectedCategory: string
   setSelectedSubCategory: Dispatch<SetStateAction<string>>
   selectedSubCategory: string
   filteredSubCategories: string[]
}

export const SubCategoriesDropdown: FC<SubCategoriesDropdownProps> =
   ({
       selectedCategory,
       setSelectedSubCategory,
       selectedSubCategory,
       filteredSubCategories
    }) => {
      const ref = useRef(null);
      const [isDropdownActive, setDropdownActive] = useState(false);

      useOnClickOutside(ref, () => setDropdownActive(false));

      return (
         <>
            {
               selectedCategory !== 'all' &&
               <div className={cn(styles.subCategoriesDropdown, { [styles.active]: isDropdownActive })}
                    onClick={() => setDropdownActive(!isDropdownActive)}
                    ref={ref}>
                  <div className={cn(styles.selectedItem, { [styles.active]: isDropdownActive })}>
                     {selectedSubCategory}
                     <ArrowDown className={cn(styles.icon, { [styles.active]: isDropdownActive })} />
                  </div>
                  <ul className={cn({ [styles.dropdownActive]: isDropdownActive })}>
                     <li
                        className={styles.dropdownSubCategory}
                        onClick={() => setSelectedSubCategory('all')}
                        key={'all'}>
                        all
                     </li>
                     {filteredSubCategories.map((item) => (
                        <li
                           onClick={() => setSelectedSubCategory(item)}
                           className={styles.dropdownSubCategory}
                           key={item}>
                           {item}
                        </li>
                     ))}
                  </ul>
               </div>
            }
         </>
      );
   };