import styles from './Subcategories.module.scss';
import ArrowDown from "../Specs/arrowDown";
import cn from "classnames";
import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { useOnClickOutside } from "components/Hooks/useOnClickOutside";

interface SubCategoriesProps {
   selectedCategory: string
   setSelectedSubCategory: Dispatch<SetStateAction<string>>
   selectedSubCategory: string
   filteredSubCategories: string[]
}

export const SubCategories: FC<SubCategoriesProps> =
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
               <div className={styles.subCategoriesDropdown} onClick={() => setDropdownActive(!isDropdownActive)}
                    ref={ref}>
                  <div className={styles.selectedItem}>
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

            <ul className={styles.subCategories}>
               {
                  selectedCategory !== 'all' &&
                  <>
                     <li
                        onClick={() => setSelectedSubCategory('all')}
                        className={cn(styles.subCategory, { [styles.selected]: selectedSubCategory === "all" })}>
                        All
                     </li>
                     {filteredSubCategories.map((item, index) =>
                        <li
                           key={index}
                           onClick={() => setSelectedSubCategory(item)}
                           className={cn(styles.subCategory, { [styles.selected]: selectedSubCategory === item })}>
                           {item}
                        </li>
                     )}
                  </>
               }
            </ul>
         </>
      );
   };