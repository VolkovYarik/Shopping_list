enum StorageActionTypes {
    ADD_TO_STORAGE = 'SET_STORAGE',
    REMOVE_FROM_STORAGE = 'REMOVE_FROM_STORAGE',
    CLEAR_STORAGE = 'CLEAR_STORAGE',
}

interface IAddToStorageAction {
    type: StorageActionTypes.ADD_TO_STORAGE;
    payload: string
}

interface IRemoveFromStorageAction {
    type: StorageActionTypes.REMOVE_FROM_STORAGE;
    payload: string;
}

interface IClearFromStorageAction {
    type: StorageActionTypes.CLEAR_STORAGE;
}

type StorageAction = IAddToStorageAction | IRemoveFromStorageAction | IClearFromStorageAction
export {
    StorageAction,
    StorageActionTypes,
}