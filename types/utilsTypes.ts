import { Dispatch, FormEvent, MouseEvent, SetStateAction } from "react";

export type FileHandlerInput =  (event: FormEvent<HTMLInputElement> , setFile: Dispatch<SetStateAction<Blob | string>>) => void;
export type FileHandlerActionButton = (event: MouseEvent<HTMLButtonElement>, setFile: Dispatch<SetStateAction<Blob | string>>) => void;