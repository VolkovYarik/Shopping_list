import { createContext, useReducer } from "react";

const initialState = {
   isModalOpen: false,
   bucket: [],
   storage: []
};

const Context = createContext({});

const SET_MODAL = 'SET_MODAL';
const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const ADD_TO_STORAGE = 'SET_STORAGE';
const REMOVE_FROM_STORAGE = 'REMOVE_FROM_STORAGE';
const STORAGE_INIT = 'STORAGE_INIT';
const BUCKET_INIT = 'BUCKET_INIT';
const CLEAR_BUCKET = 'CLEAR_BUCKET';
const CLEAR_STORAGE = 'CLEAR_STORE';

const modalReducer = (state, action) => {
   switch (action.type) {
      case SET_MODAL:
         return { ...state, isModalOpen: action.payload };
      default:
         return state;
   }
};

const bucketReducer = (state, action) => {
   switch (action.type) {
      case BUCKET_INIT:
         return { ...state, bucket: action.payload };
      case ADD_PRODUCT:
         return { ...state, bucket: [...state.bucket, action.payload] };
      case REMOVE_PRODUCT:
         return { ...state, bucket: state.bucket.filter((item) => item._id !== action.payload._id) };
      case CLEAR_BUCKET:
         return { ...state, bucket: [] };
      default:
         return state;
   }
};

const storageReducer = (state, action) => {
   switch (action.type) {
      case STORAGE_INIT:
         return { ...state, storage: action.payload };
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
   const [state, dispatch] = useReducer(combineReducers(modalReducer, bucketReducer, storageReducer), initialState);
   const value = { state, dispatch };

   return <Context.Provider value={value}>{children}</Context.Provider>;
};

const setModal = (payload) => ({ type: SET_MODAL, payload });
const addProduct = (payload) => ({ type: ADD_PRODUCT, payload });
const removeProduct = (payload) => ({ type: REMOVE_PRODUCT, payload });
const addToStorage = (payload) => ({ type: ADD_TO_STORAGE, payload });
const removeFromStorage = (payload) => ({ type: REMOVE_FROM_STORAGE, payload });
const storageInit = (payload) => ({ type: STORAGE_INIT, payload });
const clearBucket = () => ({ type: CLEAR_BUCKET });
const clearStorage = () => ({ type: CLEAR_STORAGE });
const bucketInit = (payload) => ({ type: BUCKET_INIT, payload });

export {
   Context,
   Provider,
   setModal,
   addProduct,
   removeProduct,
   addToStorage,
   removeFromStorage,
   storageInit,
   clearBucket,
   clearStorage,
   bucketInit
};