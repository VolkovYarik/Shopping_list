import { Dispatch, FormEvent, SetStateAction } from "react";

const fileHandler = (event: FormEvent<HTMLInputElement>, setFile: Dispatch<SetStateAction<Blob | string>>): void => {
   event.preventDefault()
   if (event.currentTarget.files !== null) {
      setFile(event.currentTarget.files[0])
   }
}

const cleanupFileUploading = (event: FormEvent, setFile: Dispatch<SetStateAction<Blob | string>>) => {
   event.preventDefault()
   setFile('')
}

export {
   fileHandler,
   cleanupFileUploading
}