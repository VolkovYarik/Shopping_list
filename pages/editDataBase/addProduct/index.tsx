import styles from './addProduct.module.scss';
import { MainLayout } from "components/MainLayout/MainLayout";
import Link from "next/link";
import React, { FC, FormEvent, useEffect, useRef, useState } from "react";
import { createNewProduct, getAllCategories } from "../../../axiosApi";
import { useRouter } from "next/router";
import ArrowDown from "components/Specs/arrowDown";
import cn from 'classnames';
import { useOnClickOutside } from "components/Hooks/useOnClickOutside";
import { ICategory, IProduct } from "../../../types/dataTypes";

interface AddProductProps {
   categoriesData: ICategory[] | []
}

const emptyCurrentCategory: ICategory = {
   category: "No categories",
   subCategories: ["No subcategoties"],
   _id: null
}

const AddProduct: FC<AddProductProps> = ({ categoriesData }) => {
   const [currentCategory, setCurrentCategory] = useState<ICategory>(categoriesData[0] || emptyCurrentCategory);
   const [subCategoriesData, setSubCategoriesData] = useState<string[]>(currentCategory.subCategories);

   const [isCategoriesDropdownActive, setCategoriesDropdownActive] = useState(false);
   const [isSubCategoriesDropdownActive, setSubCategoriesDropdownActive] = useState(false);

   const [selectedCategory, setSelectedCategory] = useState(currentCategory.category);

   const [selectedSubCategory, setSelectedSubCategory] = useState(currentCategory.subCategories[0]);

   const [product, setProduct] = useState<IProduct>({
      name: '',
      category: selectedCategory,
      class: selectedSubCategory,
   });

   const router = useRouter();
   const categoryRef = useRef(null);
   const subCategoryRef = useRef(null);

   useOnClickOutside(categoryRef, () => setCategoriesDropdownActive(false));
   useOnClickOutside(subCategoryRef, () => setSubCategoriesDropdownActive(false));

   useEffect(() => {
      setCurrentCategory(categoriesData.find((el) => el.category === selectedCategory) || emptyCurrentCategory);
   }, [selectedCategory]);

   useEffect(() => {
      setSubCategoriesData(currentCategory.subCategories);
      setSelectedSubCategory(currentCategory.subCategories[0]);
   }, [currentCategory]);

   useEffect(() => {
      setProduct((prev) => ({ ...prev, category: selectedCategory, class: selectedSubCategory }));
   }, [selectedCategory, selectedSubCategory]);


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
                        <div ref={categoryRef} className={styles.inputDropdown}
                             onClick={() => setCategoriesDropdownActive(!isCategoriesDropdownActive)}>
                           <ArrowDown className={cn(styles.icon, { [styles.active]: isCategoriesDropdownActive })} />
                           <div
                              className={cn(styles.selectedItem, { [styles.active]: isCategoriesDropdownActive })}>{selectedCategory}</div>
                           <ul className={cn({ [styles.dropdownActive]: isCategoriesDropdownActive })}>
                              {
                                 categoriesData.map((el) => (
                                    <li className={styles.dropdownCategory}
                                        onClick={() => setSelectedCategory(el.category)}
                                        key={el.category}><span>{el.category}</span></li>
                                 ))
                              }
                           </ul>
                        </div>
                     </div>
                     <div className={'inputWrapper'}>
                        <span className={'inputLabel'}>Subcategory</span>
                        <div ref={subCategoryRef} className={styles.inputDropdown}
                             onClick={() => setSubCategoriesDropdownActive(!isSubCategoriesDropdownActive)}>
                           <ArrowDown className={cn(styles.icon, { [styles.active]: isSubCategoriesDropdownActive })} />
                           <div
                              className={cn(styles.selectedItem, { [styles.active]: isSubCategoriesDropdownActive })}>{selectedSubCategory}</div>
                           <ul className={cn({ [styles.dropdownActive]: isSubCategoriesDropdownActive })}>
                              {
                                 subCategoriesData.map((el) => (
                                    <li key={el} className={styles.dropdownCategory}
                                        onClick={() => setSelectedSubCategory(el)}><span>{el}</span></li>
                                 ))
                              }

                           </ul>
                        </div>
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

export const getStaticProps = async () => {
   const categoriesData = await getAllCategories();

   return {
      props: {
         categoriesData
      }
   };
};