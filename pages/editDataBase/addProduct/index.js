import styles from './addProduct.module.scss';
import { MainLayout } from "/components/MainLayout/MainLayout";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createNewProduct, getAllCategories } from "../../../axios";
import { useRouter } from "next/router";
import ArrowDown from "components/Specs/arrowDown";
import cn from 'classnames';
import { useOnClickOutside } from "components/Hooks/useOnClickOutside";

const AddProduct = ({ categoriesData }) => {
   const [subCategoriesData, setSubCategoriesData] = useState([]);

   const [isCategoriesDropdownActive, setCategoriesDropdownActive] = useState(false);
   const [isSubCategoriesDropdownActive, setSubCategoriesDropdownActive] = useState(false);

   const [selectedCategory, setSelectedCategory] = useState(categoriesData[0].category);

   const [selectedSubCategory, setSelectedSubCategory] = useState(subCategoriesData[0]);

   const router = useRouter();
   const categoryRef = useRef();
   const subCategoryRef = useRef();

   useOnClickOutside(categoryRef, () => setCategoriesDropdownActive(false));
   useOnClickOutside(subCategoryRef, () => setSubCategoriesDropdownActive(false));

   const [product, setProduct] = useState({
      name: '',
      category: selectedCategory,
      class: selectedSubCategory,
      imgUrl: '',
   });

   useEffect(() => {
      const currentCategory = categoriesData.find(el => el.category === selectedCategory);
      setSubCategoriesData(currentCategory.subCategories);
   }, [selectedCategory]);

   useEffect(() => {
      setSelectedSubCategory(subCategoriesData[0]);

   }, [subCategoriesData]);

   const submitProduct = async (e) => {
      e.preventDefault();
      const body = { product };
      const data = await createNewProduct(body);
      console.log(data);
      await router.push('/shoppingList');
   };

   return (
      <MainLayout>
         <div className="container">
            <section className={styles.addProduct}>
               <div className={styles.addProductContent}>
                  <div className={styles.header}>
                     <h3>You can add a product to the database</h3>
                     <p>Please, input name, category and subcategory of product</p>
                  </div>
                  <form className={styles.form} onSubmit={submitProduct}>
                     <div className={styles.inputWrapper}>
                        <span className={styles.inputLabel}>Name</span>
                        <input className={styles.inputText} type="text" value={product.name}
                               onChange={e => setProduct({ ...product, name: e.target.value })} />
                     </div>
                     <div className={styles.inputWrapper}>
                        <span className={styles.inputLabel}>URL image</span>
                        <input className={styles.inputText} type="text" value={product.imgUrl}
                               onChange={e => setProduct({ ...product, imgUrl: e.target.value })} />
                     </div>
                     <div className={styles.inputWrapper}>
                        <span className={styles.inputLabel}>Category</span>
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
                     <div className={styles.inputWrapper}>
                        <span className={styles.inputLabel}>Subcategory</span>
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
                     <div className={styles.formActions}>
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