import { createContext, useReducer } from "react";

const initStorage = () => {
   if (typeof localStorage !== 'undefined') {
      return JSON.parse(localStorage.getItem('products') || '[]');
   }
   return null;
};

const initialState = {
   isModalOpen: false,
   bucket: [],
   storage: initStorage()
};

const Context = createContext({});

const SET_MODAL = 'SET_MODAL';
const ADD_TO_STORAGE = 'SET_STORAGE';
const REMOVE_FROM_STORAGE = 'REMOVE_FROM_STORAGE';
const CLEAR_STORAGE = 'CLEAR_STORE';

const modalReducer = (state, action) => {
   switch (action.type) {
      case SET_MODAL:
         return { ...state, isModalOpen: action.payload };
      default:
         return state;
   }
};

const storageReducer = (state, action) => {
   switch (action.type) {
      case ADD_TO_STORAGE:
         return { ...state, storage: [...state.storage, action.payload] };
      case REMOVE_FROM_STORAGE:
         return { ...state, storage: state.storage.filter((item) => item !== action.payload) };
      case CLEAR_STORAGE:
         return { ...state, storage: [] };
      default:
         return state;
   }
};

const combineReducers = (...reducers) => (state, action) => {
   for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action);
   return state;
};

const Provider = ({ children }) => {
   const [state, dispatch] = useReducer(combineReducers(modalReducer, storageReducer), initialState);
   const value = { state, dispatch };
   return (
      <Context.Provider value={value}>
         {children}
      </Context.Provider>
   );

};

const setModal = (payload) => ({ type: SET_MODAL, payload });
const addToStorage = (payload) => ({ type: ADD_TO_STORAGE, payload });
const removeFromStorage = (payload) => ({ type: REMOVE_FROM_STORAGE, payload });
const clearStorage = () => ({ type: CLEAR_STORAGE });

export {
   Context,
   Provider,
   setModal,
   addToStorage,
   removeFromStorage,
   clearStorage,
};