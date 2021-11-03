import { StorageAction } from "./storageTypes";
import { Dispatch } from "react";

interface IState {
    storage: string[] | [];
}

type Action = StorageAction

type reducerArray = {
    (state: IState, action: Action): IState
}[];

interface IContext {
    state: IState;
    dispatch: Dispatch<Action>
}

export {
    reducerArray,
    Action,
    IState,
    IContext
}