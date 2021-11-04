import { createContext, FC, useReducer } from "react";
import { Action, ContextType, State, reducerArray } from 'types/contextTypes'
import { storageReducer } from "./storageReducer";

const initialState: State = {
    storage: typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('products') || '[]') : [],
};

const Context = createContext<ContextType>({
    state: { storage: [] }, dispatch: () => {
    }
});

const combineReducers = (...reducers: reducerArray) => (state: State, action: Action) => {
    for (let i = 0; i < reducers.length; i++) {
        state = reducers[i](state, action)
    }
    return state;
};

const Provider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(combineReducers(storageReducer), initialState);
    const value = { state, dispatch };
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

export {
    Context,
    Provider,
    initialState
};