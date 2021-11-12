import { StorageAction } from "./storageTypes";
import { Dispatch } from "react";

export type State = {
   storage: string[] | [];
}

export type Action = StorageAction

export type ReducersArray = {
   (state: State, action: Action): State;
}[];

export type ContextType = {
   state: State;
   dispatch: Dispatch<Action>
}
