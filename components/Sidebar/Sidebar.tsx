import styles from "./Sidebar.module.scss";
import Link from "next/link";
import React, { FC } from "react";

export const Sidebar: FC = ({ children}) => {

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
               {children}
            </div>
         </aside>
      )
   }

