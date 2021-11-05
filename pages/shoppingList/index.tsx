import {
   addToStorage,
   Basket,
   BasketModal,
   clearStorage,
   Context,
   Dictionary,
   dictionary,
   Dropdown,
   MainLayout,
   Portal,
   ProductsCard,
   removeFromStorage
} from 'components'
import styles from 'styles/ShoppingList.module.scss';
import { FC, useContext, useEffect, useState } from "react";
import { getAllCategories, getAllProducts } from "axiosApi/";
import { ContextType } from "../../types/contextTypes";
import { Category, Product } from 'types/dataTypes'
import { GetServerSideProps } from "next";
import { Keys } from "types/serverSideTypes";

interface ShoppingListProps {
   productsData: Dictionary<Product>;
   categoriesData: Dictionary<Category>;
   categories: string[];
}


export type UpdateBasket = (product: Product) => void

const ShoppingList: FC<ShoppingListProps> = ({ productsData, categoriesData, categories }) => {
   const [selectedCategory, setSelectedCategory] = useState('all');
   const [selectedSubCategory, setSelectedSubCategory] = useState('');

   const [subCategories, setSubCategories] = useState<string[]>([]);

   const [isModalActive, setModalActive] = useState(false);
   const [basket, setBasket] = useState<Product[] | []>([]);

   const [isCategoriesDropdownActive, setCategoriesDropdownActive] = useState(false);
   const [isSubCategoriesDropdownActive, setSubCategoriesDropdownActive] = useState(false);
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
      setSubCategories(categoriesData[selectedCategory]?.subCategories || []);
   }, [selectedCategory]);

   useEffect(() => {
      setBasket(state.storage.map((element) => productsData[element]));
   }, []);

   return (
      <MainLayout title="Shopping list">
         <div className="container">
            <section className={styles.shoppingList}>
               <div className={styles.header}>
                  <div className={styles.actions}>
                     <div className={styles.col}>
                        <Dropdown
                           selectedValue={selectedCategory}
                           setDropdownActive={setCategoriesDropdownActive}
                           data={categories}
                           setValue={setSelectedCategory}
                           isDropdownActive={isCategoriesDropdownActive}
                           withInitialValue={true}
                        />
                     </div>
                     <div className={styles.col}>
                        {selectedCategory !== "all" &&
                        <Dropdown
                           selectedValue={selectedSubCategory}
                           setDropdownActive={setSubCategoriesDropdownActive}
                           data={subCategories}
                           setValue={setSelectedSubCategory}
                           isDropdownActive={isSubCategoriesDropdownActive}
                           withInitialValue={true}
                        />}

                     </div>
                  </div>
                  <div onClick={() => setModalActive(true)} className={styles.iconWrapper}>
                     <Basket className={styles.icon} />
                     <div className={styles.productsCounter}>{basket.length}</div>
                  </div>
               </div>
               <ul className={styles.cards}>
                  {Object.values<Product>(productsData).map((item) => (
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

export const getServerSideProps: GetServerSideProps = async () => {
   const allProductsData = await getAllProducts();
   const allCategoriesData = await getAllCategories();

   const categoriesData = dictionary(allCategoriesData, Keys.CATEGORY);
   const productsData = dictionary(allProductsData, Keys.ID)
   const categories = allCategoriesData.map((element) => element.category)

   return {
      props: { productsData, categoriesData, categories },
   };
};

export default ShoppingList;
