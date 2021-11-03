import { MainLayout } from "components/MainLayout/MainLayout";
import styles from '/styles/EditDataBase.module.scss';
import React, { FC, ReactElement, useContext, useState } from "react";
import Image from "next/image";
import noImage from 'assets/noImage.jpg';
import { deleteProductByID, getAllProducts } from "../../axiosApi";
import { Context } from "components/Context";
import { removeFromStorage } from "components/Context/storageReducer";
import { IContext } from "types/context";
import { IProduct } from "types/dataTypes";

interface EditDataBaseProps {
   productsData: IProduct[]
}

const EditDataBase: FC<EditDataBaseProps> = ({ productsData }) => {
   const [products, setProducts] = useState<IProduct[] | []>(productsData);
   const { dispatch, state } = useContext<IContext>(Context);

   const deleteProduct = async (product: IProduct) => {
      await deleteProductByID(product._id);
      const updatedProductsList = await getAllProducts();
      setProducts(updatedProductsList);

      if (state.storage.find((el) => el === product._id)) {
         dispatch(removeFromStorage(product._id));
      }
   };

   return (
      <MainLayout withSidebar={true} title="Edit database">
         <div className="container">
            <section className={styles.editDataBase}>
               <div className={styles.header}>
                  <h2>
                     Here you can edit database of products
                  </h2>
               </div>
               <div className={styles.content}>
                  {
                     products.map((item: IProduct): ReactElement => {
                        return (<div className={styles.card} key={item._id}>
                           <div className={styles.imgWrapper}>
                              <Image src={noImage} layout={'fill'} />
                           </div>
                           <div className={styles.cardInfo}>{item.name}</div>
                           <div className={styles.cardInfo}>{item.category}</div>
                           <div className={styles.cardInfo}>{item.class}</div>
                           <div className={styles.cardActions}>
                              <button onClick={() => deleteProduct(item)}>Delete</button>
                           </div>
                        </div>);
                     })
                  }
               </div>
            </section>
         </div>
      </MainLayout>
   );
};

export const getServerSideProps = async () => {
   const productsData = await getAllProducts();

   return {
      props: { productsData }
   };
};

export default EditDataBase;