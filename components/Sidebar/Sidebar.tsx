import styles from "./Sidebar.module.scss";
import Link from "next/link";
import { Dropdown } from "../Dropdown/Dropdown";
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Category } from "types/dataTypes";
import { Dictionary } from "../Utils";

interface SidebarProps {
   selectedCategory: string;
   selectedSubCategory: string;
   categories: string[];
   setSelectedCategory: Dispatch<SetStateAction<string>>;
   setSelectedSubCategory: Dispatch<SetStateAction<string>>;
   categoriesData: Dictionary<Category>;
}

export const Sidebar: FC<SidebarProps> =
   ({
       selectedCategory,
       categories,
       setSelectedCategory,
       selectedSubCategory,
       setSelectedSubCategory,
       categoriesData
    }) => {
      const [isDropdownCategoriesActive, setDropdownCategoriesActive] = useState(false)
      const [isDropdownSubCategoriesActive, setDropdownSubCategoriesActive] = useState(false)
      const [subCategories, setSubCategories] = useState<string[]>([]);

      useEffect(() => {
         setSelectedSubCategory('all');
         setSubCategories(categoriesData[selectedCategory]?.subCategories || []);
      }, [selectedCategory]);

      return (
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
      )
   }

