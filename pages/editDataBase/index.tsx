import {
   Context,
   Dictionary,
   dictionary,
   Dropdown,
   EditDatabaseProductsCard,
   MainLayout,
   removeFromStorage
} from "components";
import styles from 'styles/EditDataBase.module.scss';
import React, { FC, ReactElement, useContext, useEffect, useState } from "react";
import { deleteProductByID, getAllCategories, getAllProducts } from "axiosApi";
import { ContextType } from "types/contextTypes";
import { Category, Product } from "types/dataTypes";
import Link from "next/link";
import cn from "classnames";
import { GetServerSideProps } from "next";
import { Keys } from "types/serverSideTypes";

interface EditDataBaseProps {
   allProductsData: Product[];
   categoriesData: Dictionary<Category>;
   categories: string[];
}

const EditDataBase: FC<EditDataBaseProps> = ({ allProductsData, categoriesData, categories }) => {
   const [products, setProducts] = useState<Product[] | []>(allProductsData);
   const { dispatch, state } = useContext<ContextType>(Context);
   const [selectedCategory, setSelectedCategory] = useState('all');
   const [isDropdownCategoriesActive, setDropdownCategoriesActive] = useState(false)
   const [isDropdownSubCategoriesActive, setDropdownSubCategoriesActive] = useState(false)
   const [selectedSubCategory, setSelectedSubCategory] = useState('');
   const [subCategories, setSubCategories] = useState<string[]>([]);

   const deleteProduct = async (product: Product) => {
      await deleteProductByID(product._id);
      const updatedProductsList: Product[] = await getAllProducts()
      setProducts(updatedProductsList);

      if (state.storage.find((el) => el === product._id)) {
         dispatch(removeFromStorage(product._id));
      }
   };

   useEffect(() => {
      setSelectedSubCategory('all');
      setSubCategories(categoriesData[selectedCategory]?.subCategories || []);
   }, [selectedCategory]);

   return (
      <MainLayout title="Edit database">
         <aside className={styles.sidebar}>
            <div className={styles.sidebarLinks}>
               <Link href="/editDataBase/addProduct">
                  <a>
                     Add new product
                  </a>
               </Link>
               <Link href="/editDataBase/addCategory">
                  <a>
                     Add new category
                  </a>
               </Link>
            </div>
            <div className={styles.sidebarFilters}>
               <span>Select category</span>
               <Dropdown
                  selectedValue={selectedCategory}
                  setDropdownActive={setDropdownCategoriesActive}
                  data={categories}
                  setValue={setSelectedCategory}
                  isDropdownActive={isDropdownCategoriesActive}
                  withInitialValue={true}
               />
               {selectedCategory !== 'all' &&
               <>
                  <span>
                        Select subcategory
                  </span>
                  <Dropdown
                     selectedValue={selectedSubCategory}
                     setDropdownActive={setDropdownSubCategoriesActive}
                     data={subCategories}
                     setValue={setSelectedSubCategory}
                     isDropdownActive={isDropdownSubCategoriesActive}
                     withInitialValue={true}
                  />
               </>
               }

            </div>
         </aside>
         <div className={cn("container", "scrollable")}>
            <div className={styles.editDataBaseContent}>
               <div className={styles.header}>
                  <h2>
                     Here you can edit database of products
                  </h2>
               </div>
               <div className={styles.content}>
                  {
                     products.map((item: Product): ReactElement => (
                        <EditDatabaseProductsCard
                           deleteProduct={deleteProduct}
                           item={item} key={item._id}
                           selectedCategory={selectedCategory}
                           selectedSubCategory={selectedSubCategory}
                        />
                     ))
                  }
               </div>
            </div>
         </div>
      </MainLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async () => {
   const allProductsData = await getAllProducts();
   const allCategoriesData = await getAllCategories();

   const categoriesData = dictionary(allCategoriesData, Keys.CATEGORY);
   const categories = allCategoriesData.map((element) => element.category)

   return {
      props: { allProductsData, categoriesData, categories }
   };
};

export default EditDataBase;