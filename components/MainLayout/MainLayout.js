import styles from './MainLayout.module.scss';
import Head from "next/head";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Context } from "../Context";

export const MainLayout = ({ children, title }) => {
   const { pathname } = useRouter();
   const { state } = useContext(Context);
   useEffect(() => {
      if (state.isModalOpen) {
         document.body.style.overflow = 'hidden';
      }
      return () => {
         document.body.style.overflow = 'unset';
      };
   }, [state.isModalOpen]);

   return (
      <>
         <Head>
            <title>Shopping list {title}</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
         </Head>
         <header className={styles.header}>
            <nav>
               <Link href={'/'}><a
                  className={pathname === "/" ? styles.selected : ""}>Home</a></Link>
               <Link href={'/shoppingList'}><a
                  className={pathname === "/shoppingList" ? styles.selected : ""}>Shopping list</a></Link>
               <Link href={'/editDataBase'}><a
                  className={pathname === "/editDataBase" ? styles.selected : ""}>Edit database</a></Link>
            </nav>
         </header>
         <main className={styles.main}>
            {children}
         </main>
      </>
   );
};
