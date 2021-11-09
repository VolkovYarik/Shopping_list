import { BasketModal } from './BasketModal/BasketModal'
import { Context, Provider } from './Context'
import { Dropdown } from './Dropdown/Dropdown'
import { EditableProductsCard } from './EditableProductCard/EditableProductCard'
import { useOnClickOutside } from './Hooks/useOnClickOutside'
import { MainLayout } from './MainLayout/MainLayout'
import Portal from './Portal';
import { ProductsCard } from './ProductCard/ProductsCard'
import { ArrowDown, Basket, Cancel, Done, Home, Plus, Todo } from './Specs'
import { StorageObserver } from './StorageObserver'
import { addToStorage, clearStorage, removeFromStorage } from "./Context/storageReducer";
import { Dictionary, dictionary } from "./Utils";
import { Sidebar } from "./Sidebar/Sidebar";
import { Edit } from "./Specs/Edit.js"

export {
   Basket,
   Home,
   ArrowDown,
   Plus,
   Todo,
   Cancel,
   Done,
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
   Dictionary,
   dictionary,
   Sidebar,
   Edit
}