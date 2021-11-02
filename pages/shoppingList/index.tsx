import { MainLayout } from "components/MainLayout/MainLayout";
import styles from 'styles/ShoppingList.module.scss';
import { FC, useContext, useEffect, useState } from "react";
import { Icon } from "components/Icon/Icon";
import { getAllCategories, getAllProducts } from "../../axios/";
import { Context } from "components/Context";
import { BucketModal } from "components/BucketModal/BucketModal";
import Portal from "components/Portal";
import { Categories } from "components/Categories/Categories";
import { SubCategories } from "components/SubCategories/SubCategories";
import { ProductsCard } from "components/ProductCard/ProductsCard";
import { addToStorage, clearStorage, removeFromStorage } from "components/Context/storageReducer";

interface IProduct {
    _id: any;
    name: string;
    category: string;
    class: string;
}

interface ICategory {
    _id: any;
    category: string;
    subCategories: string[]
}

interface ShoppingListProps {
    productsData: IProduct[];
    categoriesData: ICategory[];
}

interface Dictionary<T> {
    [key: string]: T;
}

const findByIDs = (objArr: IProduct[], idsArr: string[]): IProduct[] => {
    const set = objArr.reduce((acc: Dictionary<IProduct>, item) => {
        acc[item._id] = item;
        return acc;
    }, {});

    return idsArr.map((item) => set[item]);
};

const ShoppingList: FC<ShoppingListProps> = ({ productsData, categoriesData }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
    const [filteredSubCategories, setFilteredSubCategories] = useState<string[]>([]);
    const [isModalActive, setModalActive] = useState<boolean>(false);
    const { state, dispatch } = useContext(Context);
    const [basket, setBasket] = useState<IProduct[] | []>([]);
    // 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
    const addToBasket = (product: IProduct): void => {
        dispatch(addToStorage(product._id));
        setBasket((prev) => [...prev, product]);
    };

    const removeFromBasket = (product: IProduct): void => {
        dispatch(removeFromStorage(product._id));
        setBasket((prev) => prev.filter((item) => item._id !== product._id));
    };

    const cleanupBasket = (): void => {
        dispatch(clearStorage());
        setBasket([]);
    };

    useEffect(() => {
        setSelectedSubCategory('all');
        const filteredCategories = categoriesData.find(item => item.category === selectedCategory);
        setFilteredSubCategories(filteredCategories?.subCategories || []);
    }, [selectedCategory]);

    useEffect(() => {
        const selectedProducts = findByIDs(productsData, state.storage);
        setBasket(selectedProducts);
    }, []);

    return (
        <MainLayout title="Shopping list">
            <div className="container">
                <section className={styles.shoppingList}>
                    <div className={styles.header}>
                        <div className={styles.actions}>
                            <Categories
                                setSelectedCategory={setSelectedCategory}
                                selectedCategory={selectedCategory}
                                categoriesData={categoriesData}
                            />
                            <SubCategories
                                selectedCategory={selectedCategory}
                                selectedSubCategory={selectedSubCategory}
                                filteredSubCategories={filteredSubCategories}
                                setSelectedSubCategory={setSelectedSubCategory}
                            />
                        </div>
                        <div onClick={() => setModalActive(true)} className={styles.iconWrapper}>
                            <Icon name="Bucket" className={styles.icon} />
                            <div className={styles.productsCounter}>{basket.length}</div>
                        </div>
                    </div>
                    <ul className={styles.cards}>
                        {productsData.map((item) => (
                            <ProductsCard
                                state={state}
                                item={item}
                                key={item._id}
                                selectedCategory={selectedCategory}
                                selectedSubCategory={selectedSubCategory}
                                basket={basket}
                                addToBasket={addToBasket}
                                removeFromBasket={removeFromBasket}
                            />
                        ))}
                    </ul>
                </section>
            </div>
            <Portal>
                <BucketModal
                    basket={basket}
                    isModalActive={isModalActive}
                    setModalActive={setModalActive}
                    removeFromBasket={removeFromBasket}
                    cleanupBasket={cleanupBasket}
                />
            </Portal>
        </MainLayout>
    );
};

export const getServerSideProps = async () => {
    const productsData = await getAllProducts();
    const categoriesData = await getAllCategories();
    return {
        props: { categoriesData, productsData },
    };
};

export default ShoppingList;
