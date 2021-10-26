import styles from './Subcategories.module.scss';
import { ProductsSubCategory } from "./ProductsSubCategory";
import ArrowDown from "../Specs/arrowDown";
import cn from "classnames";
import { useRef, useState } from "react";
import { useOnClickOutside } from "../Hooks/useOnClickOutside";

export const SubCategories = ({
                                 selectedCategory,
                                 setSelectedSubCategory,
                                 selectedSubCategory,
                                 filteredSubCategories
                              }) => {
   const ref = useRef();
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
                        key={item.category}>
                        {item}
                     </li>
                  ))}
               </ul>
            </div>
         }

         <ul className={styles.subCategories}>
            {selectedCategory !== 'all' && <><ProductsSubCategory
               key={'all'}
               subCategory={'all'}
               setSelectedSubcategory={setSelectedSubCategory}
               selectedSubCategory={selectedSubCategory} />
               {filteredSubCategories.map((item) =>
                  <ProductsSubCategory
                     key={item}
                     subCategory={item}
                     setSelectedSubcategory={setSelectedSubCategory}
                     selectedSubCategory={selectedSubCategory} />)}</>}
         </ul>
      </>
   );
};