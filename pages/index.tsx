import styles from '../styles/Home.module.scss';
import { MainLayout } from "components/MainLayout/MainLayout";
import Link from 'next/link';
import { Icon } from 'components/Icon/Icon'
import { FC } from "react";


const Home: FC = () => {
    return (
        <MainLayout title="Home">
            <section className={styles.home}>
                <h2>This is shopping list pet-project</h2>
                <span>Click on the button bellow to start</span>
                <div className={styles.homeContent}>
                    <Link href="/shoppingList">
                        <a>
                            <div className={styles.homeCard}>
                                <h4>Create shopping list</h4>
                                <Icon name="Bucket" className={styles.icon} />
                            </div>
                        </a>
                    </Link>
                </div>
            </section>
        </MainLayout>
    );
}

export default Home