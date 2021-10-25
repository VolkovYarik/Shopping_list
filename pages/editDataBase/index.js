import { MainLayout } from "components/MainLayout/MainLayout";
import styles from '/styles/EditDataBase.module.scss';
import { deleteProductByID, getAllProducts } from "/axios";
import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "components/Icon/Icon";
import { Context } from "components/Context";
import { useBucket } from "components/Hooks/useBucket";

const EditDataBase = ({ productsData }) => {
   const [products, setProducts] = useState(productsData);
   const { state } = useContext(Context);
   const { removeFromBucket } = useBucket();

   const deleteProduct = async (product) => {
      await deleteProductByID(product.id);
      const updatedProductsList = await getAllProducts();
      setProducts(updatedProductsList);
      if (state.bucket.find((el) => el.id === product.id)) {
         removeFromBucket(product);
      }
   };
   return (
      <MainLayout>
         <div className="container">
            <section className={styles.editDataBase}>
               <div className={styles.header}>
                  <Link href="/editDataBase/addProduct">
                     <a>
                        <Icon name="Plus" className={styles.icon} />
                     </a>
                  </Link>
                  <h2>
                     Here you can edit database of products
                  </h2>
               </div>
               <div className={styles.content}>
                  {
                     products.map((item) => {
                        return (<div className={styles.card} key={item.id}>
                           <div className={styles.imgWrapper}>
                              <Image src={item.imgUrl} layout={'fill'} />
                           </div>
                           <div className={styles.cardInfo}>{item.name}</div>
                           <div className={styles.cardInfo}>{item.category}</div>
                           <div className={styles.cardInfo}>{item.class}</div>
                           <div className={styles.cardActions}>
                              <button onClick={() => deleteProduct(item)}>Delete product</button>
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