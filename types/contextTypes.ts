import { StorageAction } from "./storageTypes";
import { Dispatch } from "react";

type State = {
    storage: string[] | [];
}

type Action = StorageAction

type reducerArray = {
    (state: State, action: Action): State
}[];

type ContextType = {
    state: State;
    dispatch: Dispatch<Action>
}

export {
    reducerArray,
    Action,
    State,
    ContextType
}