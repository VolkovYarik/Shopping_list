enum StorageActionTypes {
    ADD_TO_STORAGE = 'SET_STORAGE',
    REMOVE_FROM_STORAGE = 'REMOVE_FROM_STORAGE',
    CLEAR_STORAGE = 'CLEAR_STORAGE',
}

type AddToStorageAction = {
    type: StorageActionTypes.ADD_TO_STORAGE;
    payload: string
}

type RemoveFromStorageAction = {
    type: StorageActionTypes.REMOVE_FROM_STORAGE;
    payload: string;
}

type ClearFromStorageAction = {
    type: StorageActionTypes.CLEAR_STORAGE;
}

type StorageAction = AddToStorageAction | RemoveFromStorageAction | ClearFromStorageAction
export {
    StorageAction,
    StorageActionTypes,
}