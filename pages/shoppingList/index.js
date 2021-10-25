import { MainLayout } from "components/MainLayout/MainLayout";
import styles from 'styles/ShoppingList.module.scss';
import { useContext, useEffect, useState } from "react";
import { Icon } from "/components/Icon/Icon";
import { getAllCategories, getAllProducts } from "/axios";
import { bucketInit, Context, setModal, storageInit } from "/components/Context";
import { BucketModal } from "components/BucketModal/BucketModal";
import Portal from "components/Portal";
import { Categories } from "/components/Categories/Categories";
import { SubCategories } from '/components/SubCategories/SubCategories';
import { Cards } from "../../components/ProductsCard/Cards";

const ShoppingList = ({ productsData, categoriesData }) => {
   const [selectedCategory, setSelectedCategory] = useState('all');
   const [selectedSubCategory, setSelectedSubCategory] = useState('');
   const [filteredSubCategories, setFilteredSubCategories] = useState([]);
   const { state, dispatch } = useContext(Context);

   useEffect(() => {
      const productsIDs = JSON.parse(localStorage.getItem('products'));
      dispatch(storageInit(productsIDs));

      const productsSet = productsData.reduce((acc, item) => {
         acc[item.id] = item;
         return acc;
      }, {});

      const matches = productsIDs.map((el) => {
         return productsSet[el];
      });

      dispatch(bucketInit(matches));
   }, [productsData]);

   useEffect(() => {
      localStorage.setItem('products', JSON.stringify(state.storage));
   }, [state.storage]);

   useEffect(() => {
      setSelectedSubCategory('all');

      const filteredCategories = categoriesData.find(item => item.category === selectedCategory);

      setFilteredSubCategories(filteredCategories?.subCategories || []);
   }, [selectedCategory]);


   return (
      <MainLayout>
         <div className="container">
            <section className={styles.shoppingList}>
               <div className={styles.header}>
                  <div className={styles.actions}>
                     <Categories
                        setSelectedCategory={setSelectedCategory}
                        selectedCategory={selectedCategory}
                        categoriesData={categoriesData}
                     />
                     <SubCategories
                        selectedCategory={selectedCategory}
                        selectedSubCategory={selectedSubCategory}
                        filteredSubCategories={filteredSubCategories}
                        setSelectedSubCategory={setSelectedSubCategory}
                     />
                  </div>
                  <div onClick={() => dispatch(setModal(true))} className={styles.iconWrapper}>
                     <Icon name="Bucket" className={styles.icon} />
                     <div className={styles.productsCounter}>{state.bucket.length}</div>
                  </div>
               </div>
               <Cards
                  selectedSubCategory={selectedSubCategory}
                  selectedCategory={selectedCategory}
                  productsData={productsData}
               />
            </section>
         </div>
         <Portal>
            <BucketModal />
         </Portal>
      </MainLayout>
   );
};

export const getServerSideProps = async () => {
   const productsData = await getAllProducts();
   const categoriesData = await getAllCategories();
   return {
      props: { categoriesData, productsData },
   };
};

export default ShoppingList;
