import styles from './Categories.module.scss';
import cn from "classnames";

export const ProductsCategory = ({ category, setSelectedCategory, selectedCategory }) => {
   return (
      <li onClick={() => setSelectedCategory(category)}
          className={cn(styles.category, { [styles.selected]: selectedCategory === category })}>
         {category}
      </li>
   );
};