import {
   Basket,
   BasketModal,
   BasketProductCard,
   dictionary,
   Dropdown,
   MainLayout,
   Portal,
   ProductsCard,
   useBasketState,
   useProductAttributes
} from 'components'
import styles from 'styles/ShoppingList.module.scss';
import { FC, useState } from "react";
import { getAllCategories, getAllProducts } from "axiosApi/";
import { Category, Dictionary, Product } from 'types/dataTypes'
import { GetServerSideProps } from "next";
import { Keys } from "types/serverSideTypes";

interface ShoppingListProps {
   productsData: Dictionary<Product>;
   categoriesData: Dictionary<Category>;
}

const ShoppingList: FC<ShoppingListProps> = ({ productsData, categoriesData }) => {
   const [isModalActive, setModalActive] = useState(false);

   const { updateBasket, basket } = useBasketState(productsData)

   const {
      selectedCategory,
      setSelectedCategory,
      selectedSubCategory,
      setSelectedSubCategory,
      subCategories
   } = useProductAttributes(categoriesData, false)

   return (
      <MainLayout title="Shopping list">
         <div className="container">
            <section className={styles.shoppingList}>
               <div className={styles.header}>
                  <div className={styles.actions}>
                     <div className={styles.col}>
                        <Dropdown
                           selectedValue={selectedCategory}
                           data={Object.keys(categoriesData)}
                           setValue={setSelectedCategory}
                           withInitialValue={true}
                        />
                     </div>
                     <div className={styles.col}>
                        {selectedCategory !== "all" &&
                        <Dropdown
                           selectedValue={selectedSubCategory}
                           data={subCategories}
                           setValue={setSelectedSubCategory}
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
                        updateBasket={updateBasket}
                     />
                  ))}
               </ul>
            </section>
         </div>
         <Portal>
            <BasketModal
               isModalActive={isModalActive}
               setModalActive={setModalActive}
               updateBasket={updateBasket}
            >
               {basket.map((item) =>
                  <BasketProductCard
                     updateBasket={updateBasket}
                     item={item}
                     key={item._id}
                  />)}
            </BasketModal>
         </Portal>
      </MainLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async () => {
   const allProductsData = await getAllProducts();
   const allCategoriesData = await getAllCategories();

   const categoriesData = dictionary(allCategoriesData, Keys.CATEGORY);
   const productsData = dictionary(allProductsData, Keys.ID)

   return {
      props: { productsData, categoriesData },
   };
};

export default ShoppingList;
