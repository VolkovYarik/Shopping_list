import { Dictionary, dictionary, Dropdown, MainLayout } from "components";
import Link from "next/link";
import React, { FC, FormEvent, useEffect, useState } from "react";
import { createNewProduct, getAllCategories } from "axiosApi";
import { useRouter } from "next/router";
import { Category } from "types/dataTypes";
import { GetStaticProps } from "next";
import { ProductForm } from "types/axiosApiTypes";
import { Keys } from "types/serverSideTypes";

interface AddProductProps {
   categoriesData: Dictionary<Category>;
   categories: string[];
}

const AddProduct: FC<AddProductProps> = ({ categoriesData, categories }) => {
   const [subCategories, setSubCategories] = useState<string[] | []>([]);
   const [isCategoriesDropdownActive, setCategoriesDropdownActive] = useState(false);
   const [isSubCategoriesDropdownActive, setSubCategoriesDropdownActive] = useState(false);
   const [selectedCategory, setSelectedCategory] = useState(categories[0]);
   const [selectedSubCategory, setSelectedSubCategory] = useState(categoriesData[selectedCategory].subCategories[0]);

   const [product, setProduct] = useState<ProductForm>({
      name: '',
      category: selectedCategory,
      class: selectedSubCategory,
   });

   const router = useRouter();

   useEffect(() => {
      setProduct((prev) => ({ ...prev, category: selectedCategory, class: selectedSubCategory }));
   }, [selectedCategory, selectedSubCategory]);

   useEffect(() => {
      setSubCategories(categoriesData[selectedCategory]?.subCategories || []);
      setSelectedSubCategory(categoriesData[selectedCategory]?.subCategories[0]);
   }, [selectedCategory]);

   const submitProduct = async (event: FormEvent) => {
      event.preventDefault();
      await createNewProduct(product);
      await router.push('/editDataBase');
   };

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
                        <input className={'inputText'} type="text" value={product.name}
                               onChange={e => setProduct({ ...product, name: e.target.value })} />
                     </div>
                     <div className={'inputWrapper'}>
                        <span className={'inputLabel'}>Category</span>
                        <Dropdown
                           selectedValue={selectedCategory}
                           setDropdownActive={setCategoriesDropdownActive}
                           data={categories} setValue={setSelectedCategory}
                           isDropdownActive={isCategoriesDropdownActive}
                           withInitialValue={false}
                        />
                     </div>
                     <div className={'inputWrapper'}>
                        <span className={'inputLabel'}>Subcategory</span>
                        <Dropdown
                           selectedValue={selectedSubCategory}
                           setDropdownActive={setSubCategoriesDropdownActive}
                           data={subCategories}
                           setValue={setSelectedSubCategory}
                           isDropdownActive={isSubCategoriesDropdownActive}
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

   const categories = allCategoriesData.map((element) => element.category)
   const categoriesData = dictionary(allCategoriesData, Keys.CATEGORY);

   return {
      props: {
         categories,
         categoriesData
      }
   };
};