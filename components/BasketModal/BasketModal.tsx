import styles from './BasketModal.module.scss';
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import cn from 'classnames';
import { useOnClickOutside } from "components";

interface BasketModalProps {
   cleanupBasket: () => void;
   isModalActive: boolean,
   setModalActive: Dispatch<SetStateAction<boolean>>
}

export const BasketModal: FC<BasketModalProps> =
   ({
       cleanupBasket,
       isModalActive,
       setModalActive,
       children
    }) => {
      const ref = useRef(null);


      useOnClickOutside(ref, () => setModalActive(false));

      useEffect(() => {
         if (isModalActive) {
            document.body.style.overflow = 'hidden';
         }
         return () => {
            document.body.style.overflow = 'unset';
         };
      }, [isModalActive]);

      if (!isModalActive) {
         return null;
      }

      return (
         <div className={cn(styles.bucketModal, { [styles.active]: isModalActive })}>
            <div ref={ref} className={styles.bucketModalContent}>
               <h4 className={styles.title}>Your bucket:</h4>
               <ul>
                  {children}
               </ul>
               <div className={styles.modalActions}>
                  <button>Save this bucket</button>
                  <button onClick={() => setModalActive(false)}>Close</button>
                  <button onClick={cleanupBasket}>Delete all</button>
               </div>
            </div>
         </div>
      );
   };