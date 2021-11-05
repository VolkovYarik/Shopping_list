import { BasketModal } from './BasketModal/BasketModal'
import { Context, Provider } from './Context'
import { Dropdown } from './Dropdown/Dropdown'
import { EditDatabaseProductsCard } from './EditDatabaseProductCard/EditDatabaseProductsCard'
import { useOnClickOutside } from './Hooks/useOnClickOutside'
import { MainLayout } from './MainLayout/MainLayout'
import Portal from './Portal';
import { ProductsCard } from './ProductCard/ProductsCard'
import { ArrowDown, Basket, Home, Plus, Todo } from './Specs'
import { StorageObserver } from './StorageObserver'
import { addToStorage, clearStorage, removeFromStorage } from "./Context/storageReducer";
import {Dictionary, dictionary} from "./Utils";

export {
   Basket,
   Home,
   ArrowDown,
   Plus,
   Todo,
   Context,
   Dropdown,
   BasketModal,
   StorageObserver,
   ProductsCard,
   Portal,
   EditDatabaseProductsCard,
   useOnClickOutside,
   MainLayout,
   addToStorage,
   clearStorage,
   removeFromStorage,
   Provider,
   Dictionary,
   dictionary
}