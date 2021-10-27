import { MainLayout } from "components/MainLayout/MainLayout";
import styles from '/styles/EditDataBase.module.scss';
import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "components/Icon/Icon";
import { Context } from "components/Context";
import { useBucket } from "components/Hooks/useBucket";
import noImage from 'assets/noImage.jpg';
import { deleteProductByID, getAllProducts } from "../../axios";

const EditDataBase = ({ productsData }) => {
   const [products, setProducts] = useState(productsData);
   const { state } = useContext(Context);
   const { removeFromBucket } = useBucket();

   console.log(state.bucket);

   const deleteProduct = async (product) => {

      await deleteProductByID(product._id);
      const updatedProductsList = await getAllProducts();
      setProducts(updatedProductsList);
      if (state.bucket.find((el) => el._id === product._id)) {
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