import { Dispatch, FC, SetStateAction, useRef } from "react";
import styles from './Dropdown.module.scss'
import cn from 'classnames'
import { useOnClickOutside } from "../Hooks/useOnClickOutside";
import ArrowDown from "../Specs/ArrowDown";

interface DropdownProps {
   selectedCategory: string;
   setDropdownActive: Dispatch<SetStateAction<boolean>>;
   data: string[];
   setValue: Dispatch<SetStateAction<string>>
   isDropdownActive: boolean;
}

// to refactor dropdowns

export const Dropdown: FC<DropdownProps> =
   ({
       setDropdownActive,
       isDropdownActive,
       selectedCategory,
       data,
       setValue,
    }) => {

      const ref = useRef(null);

      useOnClickOutside(ref, () => setDropdownActive(false));

      return (
         <div
            className={cn(styles.dropdown, { [styles.active]: isDropdownActive })}
            onClick={() => setDropdownActive(!isDropdownActive)}
            ref={ref}
         >
            <div className={cn(styles.selectedItem, { [styles.active]: isDropdownActive })}>
               {selectedCategory}
               <ArrowDown className={cn(styles.icon, { [styles.active]: isDropdownActive })} />
            </div>
            <ul className={cn({ [styles.dropdownActive]: isDropdownActive })}>
               <li className={styles.dropdownCategory} onClick={() => setValue("all")}>All</li>
               {data.map((item, index) => (
                  <li key={index} onClick={() => setValue(item)} className={styles.dropdownCategory}>{item}</li>
               ))}
            </ul>
         </div>
      )
   }