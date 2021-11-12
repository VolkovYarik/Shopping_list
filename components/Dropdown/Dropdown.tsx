import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import styles from './Dropdown.module.scss'
import cn from 'classnames'
import { ArrowDown, useOnClickOutside } from "components";

interface DropdownProps {
   selectedValue: string;
   data: string[];
   setValue: Dispatch<SetStateAction<string>> | { (value: string): void }
   withInitialValue: boolean;
}

export const Dropdown: FC<DropdownProps> =
   ({
       selectedValue,
       data,
       setValue,
       withInitialValue,
    }) => {

      const [isDropdownActive, setDropdownActive] = useState(false)

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