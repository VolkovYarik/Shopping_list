import { BasketModal } from './BasketModal/BasketModal'
import { BasketProductCard } from "./BasketModal/BasketProductCard";
import { Context, Provider } from './Context'
import { Dropdown } from './Dropdown/Dropdown'
import { EditableProductsCard } from './EditableProductCard/EditableProductCard'
import { useOnClickOutside } from './Hooks/useOnClickOutside'
import { MainLayout } from './MainLayout/MainLayout'
import Portal from './Portal';
import { ProductsCard } from './ProductCard/ProductsCard'
import { ArrowDown, Basket, Home, Plus, Todo } from './Specs'
import { StorageObserver } from './StorageObserver'
import { addToStorage, clearStorage, removeFromStorage } from "./Context/storageReducer";
import { Sidebar } from "./Sidebar/Sidebar";
import { Edit } from "./Specs/Edit.js";
import { cleanupFileUploading, dictionary, fileHandler } from "./Utils";
import {useProductAttributes} from './Hooks/useProductAttributes'

export {
   Basket,
   BasketProductCard,
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
   EditableProductsCard,
   useOnClickOutside,
   MainLayout,
   addToStorage,
   clearStorage,
   removeFromStorage,
   Provider,
   dictionary,
   fileHandler,
   cleanupFileUploading,
   Sidebar,
   Edit,
   useProductAttributes
}