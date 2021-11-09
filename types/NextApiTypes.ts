import { NextApiRequest } from "next";

export type File = {
   fieldname: string,
   originalname: string,
   encoding: string,
   mimetype: string,
   destination: string,
   filename: string,
   path: string,
   size: number
}

export interface UploadApiRequest extends NextApiRequest {
   file: File;
}