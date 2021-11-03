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
import { IContext } from "../../types/context";
import { ICategory, IProduct } from 'types/dataTypes'
import Basket from "components/Specs/Basket";

// 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

interface ShoppingListProps {
   productsData: IProduct[];
   categoriesData: ICategory[];
}

interface Dictionary<T> {
   [key: string]: T;
}

export type UpdateBasketFunction = (product: IProduct) => void
export type ClearBasketFunction = () => void

const findByIDs = (objArr: IProduct[], idsArr: string[]): IProduct[] => {
   const set = objArr.reduce((acc: Dictionary<IProduct>, item) => {
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
   const [basket, setBasket] = useState<IProduct[] | []>([]);

   const { state, dispatch } = useContext<IContext>(Context);


   const addToBasket: UpdateBasketFunction = (product) => {
      dispatch(addToStorage(product._id));
      setBasket((prev) => [...prev, product]);
   };

   const removeFromBasket: UpdateBasketFunction = (product) => {
      dispatch(removeFromStorage(product._id));
      setBasket((prev) => prev.filter((item) => item._id !== product._id));
   };

   const cleanupBasket: ClearBasketFunction = () => {
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

   useEffect(() => {
      if (isModalActive) {
         document.body.style.overflow = 'hidden';
      }
      return () => {
         document.body.style.overflow = 'unset';
      };
   }, [isModalActive]);

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
