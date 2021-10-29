import { MainLayout } from "components/MainLayout/MainLayout";
import styles from 'styles/ShoppingList.module.scss';
import { useContext, useEffect, useState } from "react";
import { Icon } from "/components/Icon/Icon";
import { getAllCategories, getAllProducts } from "/axios";
import { addToStorage, clearStorage, Context, removeFromStorage, setModal } from "/components/Context";
import { BucketModal } from "components/BucketModal/BucketModal";
import Portal from "components/Portal";
import { Categories } from "components/Categories/Categories";
import { SubCategories } from "components/SubCategories/SubCategories";
import { ProductsCard } from "components/ProductCard/ProductsCard";

const findByIDs = (objArr, idsArr) => {
   const set = objArr.reduce((acc, item) => {
      acc[item._id] = item;
      return acc;
   }, {});

   return idsArr.map((item) => set[item]);
};

//refactoting: categories, subCategories

const ShoppingList = ({ productsData, categoriesData }) => {
   const [selectedCategory, setSelectedCategory] = useState('all');
   const [selectedSubCategory, setSelectedSubCategory] = useState('');
   const [filteredSubCategories, setFilteredSubCategories] = useState([]);
   const { state, dispatch } = useContext(Context);
   const [basket, setBasket] = useState([]);

   const addToBasket = (product) => {
      dispatch(addToStorage(product._id));
      setBasket((prev) => [...prev, product]);
   };

   const removeFromBasket = (product) => {
      dispatch(removeFromStorage(product._id));
      setBasket((prev) => prev.filter((item) => item._id !== product._id));
   };

   const cleanupBasket = () => {
      dispatch(clearStorage());
      setBasket([]);
   };

   useEffect(() => {
      setSelectedSubCategory('all');
      const filteredCategories = categoriesData.find(item => item.category === selectedCategory);
      setFilteredSubCategories(filteredCategories?.subCategories || []);
   }, [selectedCategory]);

   useEffect(() => {
      const selectedProducts = findByIDs(productsData, state.storage);
      setBasket(selectedProducts);
   }, []);

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
                     <div className={styles.productsCounter}>{basket.length}</div>
                  </div>
               </div>
               <ul className={styles.cards}>
                  {productsData.map((item) => (
                     <ProductsCard
                        state={state}
                        item={item}
                        key={item._id}
                        selectedCategory={selectedCategory}
                        selectedSubCategory={selectedSubCategory}
                        basket={basket}
                        addToBasket={addToBasket}
                        removeFromBasket={removeFromBasket}
                     />
                  ))}
               </ul>
            </section>
         </div>
         <Portal>
            <BucketModal basket={basket} removeFromBasket={removeFromBasket} cleanupBasket={cleanupBasket} />
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
