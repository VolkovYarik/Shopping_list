import { Dispatch, FC, SetStateAction, useRef } from "react";
import styles from './Dropdown.module.scss'
import cn from 'classnames'
import { useOnClickOutside, ArrowDown } from "components";

interface DropdownProps {
   selectedValue: string;
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
       selectedValue,
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
            <div className={styles.selectedItem}>
               {selectedValue}
               <ArrowDown className={styles.icon} />
            </div>
            <ul>
               <li className={styles.dropdownCategory} onClick={() => setValue("all")}>All</li>
               {data.map((item, index) => (
                  <li key={index} onClick={() => setValue(item)} className={styles.dropdownCategory}>{item}</li>
               ))}
            </ul>
         </div>
      )
   }