import { dictionary, Dropdown, MainLayout, useProductAttributes } from "components";
import Link from "next/link";
import React, { FC, FormEvent } from "react";
import { createNewProduct, getAllCategories } from "axiosApi";
import { useRouter } from "next/router";
import { Category, Dictionary } from "types/dataTypes";
import { GetStaticProps } from "next";
import { Keys } from "types/serverSideTypes";

interface AddProductProps {
   categoriesData: Dictionary<Category>;
}

const AddProduct: FC<AddProductProps> = ({ categoriesData }) => {
   const router = useRouter();

   const submitProduct = async (event: FormEvent) => {
      event.preventDefault();
      await createNewProduct(currentProductState);
      await router.push('/editDataBase');
   };

   const {
      currentProductState,
      productNameHandler,
      selectedSubCategory,
      subCategories,
      setSelectedSubCategory,
      selectedCategory,
      setSelectedCategory
   } = useProductAttributes(categoriesData, true);

   return (
      <MainLayout title="Add product">
         <div className="container">
            <section className={'addProduct'}>
               <div className={'formWrapper'}>
                  <div className={'formHeader'}>
                     <h3>You can add a product to the database</h3>
                     <p>Please, input name, category and subcategory of product</p>
                  </div>
                  <form className={'form'} onSubmit={submitProduct}>
                     <div className={'inputWrapper'}>
                        <span className={'inputLabel'}>Name</span>
                        <input className={'inputText'} type="text" value={currentProductState.name}
                               onChange={productNameHandler} />
                     </div>
                     <div className={'inputWrapper'}>
                        <span className={'inputLabel'}>Category</span>
                        <Dropdown
                           selectedValue={selectedCategory}
                           data={Object.keys(categoriesData)}
                           setValue={setSelectedCategory}
                           withInitialValue={false}
                        />
                     </div>
                     <div className={'inputWrapper'}>
                        <span className={'inputLabel'}>Subcategory</span>
                        <Dropdown
                           selectedValue={selectedSubCategory}
                           data={subCategories}
                           setValue={setSelectedSubCategory}
                           withInitialValue={false}
                        />
                     </div>
                     <div className={'formActions'}>
                        <button type="submit">Submit</button>
                        <Link href={'/editDataBase'}>
                           <a>
                              <button>Back</button>
                           </a>
                        </Link>
                     </div>
                  </form>
               </div>
            </section>
         </div>
      </MainLayout>
   );
};


export default AddProduct;

export const getStaticProps: GetStaticProps = async () => {
   const allCategoriesData = await getAllCategories();

   const categoriesData = dictionary(allCategoriesData, Keys.CATEGORY);

   return {
      props: {
         categoriesData
      }
   };
};