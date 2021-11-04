import { MainLayout } from "components/MainLayout/MainLayout";
import styles from '/styles/EditDataBase.module.scss';
import React, { FC, ReactElement, useContext, useEffect, useState } from "react";
import { deleteProductByID, getAllCategories, getAllProducts } from "../../axiosApi";
import { Context } from "components/Context";
import { removeFromStorage } from "components/Context/storageReducer";
import { ContextType } from "types/contextTypes";
import { Category, Product } from "types/dataTypes";
import Link from "next/link";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import cn from "classnames";
import { EditDatabaseProductsCard } from "../../components/EditDatabaseProductCard/EditDatabaseProductsCard";
import { GetServerSideProps } from "next";

interface EditDataBaseProps {
   productsData: Product[] | [];
   categoriesData: Category[] | []
}

const EditDataBase: FC<EditDataBaseProps> = ({ productsData, categoriesData }) => {
   const [products, setProducts] = useState<Product[] | []>(productsData);
   const { dispatch, state } = useContext<ContextType>(Context);
   const [selectedCategory, setSelectedCategory] = useState('all');
   const [isDropdownCategoriesActive, setDropdownCategoriesActive] = useState(false)
   const [isDropdownSubCategoriesActive, setDropdownSubCategoriesActive] = useState(false)
   const [selectedSubCategory, setSelectedSubCategory] = useState('');
   const [filteredSubCategories, setFilteredSubCategories] = useState<string[]>([]);
   const categories = categoriesData.map((elem) => elem.category)

   const deleteProduct = async (product: Product) => {
      await deleteProductByID(product._id);
      const updatedProductsList = await getAllProducts();
      setProducts(updatedProductsList);

      if (state.storage.find((el) => el === product._id)) {
         dispatch(removeFromStorage(product._id));
      }
   };

   useEffect(() => {
      setSelectedSubCategory('all');
      const filteredCategories = categoriesData.find((item) => item.category === selectedCategory);
      setFilteredSubCategories(filteredCategories?.subCategories || []);
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
               <Dropdown selectedCategory={selectedCategory} setDropdownActive={setDropdownCategoriesActive}
                         data={categories}
                         setValue={setSelectedCategory} isDropdownActive={isDropdownCategoriesActive} />
               {selectedCategory !== 'all' &&
               <>
                  <span>
                        Select subcategory
                  </span>
                  <Dropdown
                     selectedCategory={selectedSubCategory}
                     setDropdownActive={setDropdownSubCategoriesActive}
                     data={filteredSubCategories}
                     setValue={setSelectedSubCategory}
                     isDropdownActive={isDropdownSubCategoriesActive} />
               </>
               }

            </div>
         </aside>
         <div className={cn("container", "scrollable")}>
            <section className={styles.editDataBase}>
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
            </section>
         </div>
      </MainLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async () => {
   const productsData = await getAllProducts();
   const categoriesData = await getAllCategories();
   return {
      props: { productsData, categoriesData }
   };
};

export default EditDataBase;