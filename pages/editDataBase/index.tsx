import { dictionary, EditableProductsCard, MainLayout, Sidebar } from "components";
import styles from 'styles/EditDataBase.module.scss';
import React, { FC, ReactElement, useState } from "react";
import { getAllCategories, getAllProducts } from "axiosApi";
import { Category, Dictionary, Product } from "types/dataTypes";
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
   const [selectedCategory, setSelectedCategory] = useState('all');
   const [selectedSubCategory, setSelectedSubCategory] = useState('');

   const updatingProductList = async (): Promise<void> => {
      const updatedProductsList: Product[] = await getAllProducts()
      setProducts(updatedProductsList);
   }

   return (
      <MainLayout title="Edit database">
         <Sidebar
            selectedCategory={selectedCategory}
            categories={categories}
            selectedSubCategory={selectedSubCategory}
            setSelectedCategory={setSelectedCategory}
            setSelectedSubCategory={setSelectedSubCategory}
            categoriesData={categoriesData}
         />
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
                        <EditableProductsCard
                           item={item}
                           key={item._id}
                           selectedCategory={selectedCategory}
                           selectedSubCategory={selectedSubCategory}
                           categories={categories}
                           categoriesData={categoriesData}
                           updatingProductList={updatingProductList}
                        />
                     ))
                  }
               </div>
            </div>
         </div>
      </MainLayout>
   )
      ;
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