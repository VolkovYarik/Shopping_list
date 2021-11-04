import { MainLayout } from "components/MainLayout/MainLayout";
import styles from 'styles/ShoppingList.module.scss';
import { FC, useContext, useEffect, useState } from "react";
import { getAllCategories, getAllProducts } from "../../axiosApi/";
import { Context } from "components/Context";
import { BasketModal } from "components/BasketModal/BasketModal";
import Portal from "components/Portal";
import { Categories } from "components/Categories/Categories";
import { SubCategories } from "components/SubCategories/SubCategories";
import { ProductsCard } from "components/ProductCard/ProductsCard";
import { addToStorage, clearStorage, removeFromStorage } from "components/Context/storageReducer";
import { ContextType } from "../../types/contextTypes";
import { Category, Product } from 'types/dataTypes'
import Basket from "components/Specs/Basket";

interface ShoppingListProps {
   productsData: Product[];
   categoriesData: Category[];
}

interface Dictionary<T extends object> {
   [key: string]: T;
}

export type UpdateBasket = (product: Product) => void

const findByIDs = (objArr: Product[], idsArr: string[]): Product[] => {
   const set = objArr.reduce((acc: Dictionary<Product>, item) => {
      acc[item._id] = item;
      return acc;
   }, {});

   return idsArr.map((item) => set[item]);
};

const ShoppingList: FC<ShoppingListProps> = ({ productsData, categoriesData }) => {
   const [selectedCategory, setSelectedCategory] = useState('all');
   const [selectedSubCategory, setSelectedSubCategory] = useState('');
   const [filteredSubCategories, setFilteredSubCategories] = useState<string[]>([]);
   const [isModalActive, setModalActive] = useState(false);
   const [basket, setBasket] = useState<Product[] | []>([]);

   const { state, dispatch } = useContext<ContextType>(Context);

   const addToBasket: UpdateBasket = (product) => {
      dispatch(addToStorage(product._id));
      setBasket((prev) => [...prev, product]);
   };

   const removeFromBasket: UpdateBasket = (product) => {
      dispatch(removeFromStorage(product._id));
      setBasket((prev) => prev.filter((item) => item._id !== product._id));
   };

   const cleanupBasket = (): void => {
      dispatch(clearStorage());
      setBasket([]);
   };

   useEffect(() => {
      setSelectedSubCategory('all');
      const filteredCategories = categoriesData.find((item) => item.category === selectedCategory);
      setFilteredSubCategories(filteredCategories?.subCategories || []);
   }, [selectedCategory]);

   useEffect(() => {
      const selectedProducts = findByIDs(productsData, state.storage);
      setBasket(selectedProducts);
   }, []);

   return (
      <MainLayout title="Shopping list">
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
                  <div onClick={() => setModalActive(true)} className={styles.iconWrapper}>
                     <Basket className={styles.icon} />
                     <div className={styles.productsCounter}>{basket.length}</div>
                  </div>
               </div>
               <ul className={styles.cards}>
                  {productsData.map((item) => (
                     <ProductsCard
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
            <BasketModal
               basket={basket}
               isModalActive={isModalActive}
               setModalActive={setModalActive}
               removeFromBasket={removeFromBasket}
               cleanupBasket={cleanupBasket}
            />
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
