import styles from './BucketModal.module.scss';
import { useContext, useRef } from "react";
import { Context, setModal } from "../Context";
import cn from 'classnames';
import { useOnClickOutside } from "/components/Hooks/useOnClickOutside";
import Image from "next/image";
import noImage from 'assets/noImage.jpg';

export const BucketModal = ({ basket, removeFromBasket, cleanupBasket }) => {
   const { state, dispatch } = useContext(Context);
   const ref = useRef();

   useOnClickOutside(ref, () => dispatch(setModal(false)));

   if (!state.isModalOpen) {
      return null;
   }

   return (
      <div className={cn(styles.bucketModal, { [styles.active]: state.isModalOpen })}>
         <div ref={ref} className={styles.bucketModalContent}>
            <h4 className={styles.title}>Your bucket:</h4>
            <ul>{basket.map((elem) => {
               return (
                  <li key={elem?._id} className={styles.productsCardWrapper}>
                     <div className={styles.productsCard}>
                        <div className={styles.imgWrapper}>
                           <Image src={noImage} layout={'fill'} />
                        </div>
                        <span>{elem?.name}</span>
                        <button onClick={() => removeFromBasket(elem)} />
                     </div>
                  </li>);
            })}</ul>
            <div className={styles.modalActions}>
               <button>Save this bucket</button>
               <button onClick={() => dispatch(setModal(false))}>Close</button>
               <button onClick={cleanupBasket}>Delete all</button>
            </div>
         </div>
      </div>
   );
};