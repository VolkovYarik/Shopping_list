import { dictionary, Dropdown, EditableProductsCard, MainLayout, Sidebar, useProductAttributes } from "components";
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
}

const EditDataBase: FC<EditDataBaseProps> = ({ allProductsData, categoriesData }) => {
   const [products, setProducts] = useState<Product[] | []>(allProductsData);

   const updatingProductList = async (): Promise<void> => {
      const updatedProductsList: Product[] = await getAllProducts()
      setProducts(updatedProductsList);
   }

   const {
      selectedCategory,
      setSelectedCategory,
      selectedSubCategory,
      setSelectedSubCategory,
      subCategories
   } = useProductAttributes(categoriesData, false)

   return (
      <MainLayout title="Edit database">
         <Sidebar>
            <span>Select category</span>
            <Dropdown
               selectedValue={selectedCategory}
               data={Object.keys(categoriesData)}
               setValue={setSelectedCategory}
               withInitialValue={true}
            />
            {
               selectedCategory !== 'all' &&
               <>
                  <span>Select subcategory</span>
                  <Dropdown
                     selectedValue={selectedSubCategory}
                     data={subCategories}
                     setValue={setSelectedSubCategory}
                     withInitialValue={true}
                  />
               </>
            }
         </Sidebar>
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
                           categoriesData={categoriesData}
                           updatingProductList={updatingProductList}
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

   return {
      props: { allProductsData, categoriesData }
   };
};

export default EditDataBase;