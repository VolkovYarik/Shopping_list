import { StorageAction, StorageActionTypes } from "types/storage";
import { Action, IState } from "types/context";
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

const addToStorage = (payload: string): Action => ({ type: StorageActionTypes.ADD_TO_STORAGE, payload });
const removeFromStorage = (payload: string): Action => ({ type: StorageActionTypes.REMOVE_FROM_STORAGE, payload });
const clearStorage = (): Action => ({ type: StorageActionTypes.CLEAR_STORAGE });

export {
    storageReducer,
    addToStorage,
    removeFromStorage,
    clearStorage,
}