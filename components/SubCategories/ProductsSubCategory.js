import styles from './Subcategories.module.scss';

import cn from 'classnames';

export const ProductsSubCategory = ({ subCategory, selectedSubCategory, setSelectedSubcategory }) => {
   return (
      <li onClick={() => setSelectedSubcategory(subCategory)}
          className={cn(styles.subCategory, { [styles.selected]: selectedSubCategory === subCategory })}>
         {subCategory}
      </li>
   );
};