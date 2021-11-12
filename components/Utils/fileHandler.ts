import { FileHandlerActionButton, FileHandlerInput } from 'types/utilsTypes'


const fileHandler: FileHandlerInput = (event, setFile) => {
   event.preventDefault()
   if (event.currentTarget.files !== null) {
      setFile(event.currentTarget.files[0])
   }
}

const cleanupFileUploading: FileHandlerActionButton = (event, setFile) => {
   event.preventDefault()
   setFile('')
}

export {
   fileHandler,
   cleanupFileUploading
}