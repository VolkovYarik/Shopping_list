import { StorageAction, StorageActionTypes } from "types/storageTypes";
import { IState } from "types/contextTypes";
import { initialState } from './index'

const storageReducer = (state = initialState, action: StorageAction): IState => {
    switch (action.type) {
        case StorageActionTypes.ADD_TO_STORAGE:
            return { ...state, storage: [...state.storage, action.payload] };
        case StorageActionTypes.REMOVE_FROM_STORAGE:
            return { ...state, storage: state.storage.filter((item: string) => item !== action.payload) };
        case StorageActionTypes.CLEAR_STORAGE:
            return { ...state, storage: [] };
        default:
            return state;
    }
};

const addToStorage = (payload: string):StorageAction => ({ type: StorageActionTypes.ADD_TO_STORAGE, payload });
const removeFromStorage = (payload: string):StorageAction => ({ type: StorageActionTypes.REMOVE_FROM_STORAGE, payload });
const clearStorage = ():StorageAction => ({ type: StorageActionTypes.CLEAR_STORAGE });

export {
    storageReducer,
    addToStorage,
    removeFromStorage,
    clearStorage,
}