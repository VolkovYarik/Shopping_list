import styles from './addProduct.module.scss';
import { MainLayout } from "/components/MainLayout/MainLayout";
import Link from "next/link";
import { useState } from "react";
import { createNewProduct } from "../../../axios";
import { useRouter } from "next/router";

const AddProduct = () => {
      const router = useRouter();
      const [product, setProduct] = useState({
         name: '',
         category: '',
         class: '',
         imgUrl: '',
      });

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
                           <span>Name</span>
                           <input type="text" value={product.name}
                                  onChange={e => setProduct({ ...product, name: e.target.value })} />
                        </div>
                        <div className={styles.inputWrapper}>
                           <span>Category</span>
                           <input type="text" value={product.category}
                                  onChange={e => setProduct({ ...product, category: e.target.value })} />
                        </div>
                        <div className={styles.inputWrapper}>
                           <span>Subcategory</span>
                           <input type="text" value={product.class}
                                  onChange={e => setProduct({ ...product, class: e.target.value })} />
                        </div>
                        <div className={styles.inputWrapper}>
                           <span>URL image</span>
                           <input type="text" value={product.imgUrl}
                                  onChange={e => setProduct({ ...product, imgUrl: e.target.value })} />
                        </div>
                        <div className={styles.formActions}>
                           <button type="submit">Submit</button>
                           <Link href={'/shoppingList'}>
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
   }
;

export default AddProduct;