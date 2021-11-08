import { Dispatch, FC, SetStateAction, useRef } from "react";
import styles from './Dropdown.module.scss'
import cn from 'classnames'
import { ArrowDown, useOnClickOutside } from "components";

interface DropdownProps {
   selectedValue: string;
   setDropdownActive: Dispatch<SetStateAction<boolean>>;
   data: string[];
   setValue: Dispatch<SetStateAction<string>> | { (value: string): void }
   isDropdownActive: boolean;
   withInitialValue: boolean;
}

export const Dropdown: FC<DropdownProps> =
   ({
       setDropdownActive,
       isDropdownActive,
       selectedValue,
       data,
       setValue,
       withInitialValue,
    }) => {

      const ref = useRef(null);

      useOnClickOutside(ref, () => setDropdownActive(false));

      return (
         <div
            className={cn(styles.dropdown, { [styles.active]: isDropdownActive })}
            onClick={() => setDropdownActive(!isDropdownActive)}
            ref={ref}
         >
            {selectedValue}
            <ArrowDown className={styles.icon} />
            <ul>
               {withInitialValue && <li className={styles.dropdownCategory} onClick={() => setValue("all")}>All</li>}
               {data.map((item, index) => (
                  <li key={index} onClick={() => setValue(item)} className={styles.dropdownCategory}>{item}</li>
               ))}
            </ul>
         </div>
      )
   }