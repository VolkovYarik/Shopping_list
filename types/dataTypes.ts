export type Product = {
   _id: any;
   name: string;
   category: string;
   class: string;
   image?: string
}

export interface Dictionary<T extends object> {
   [key: string]: T;
}

export type Category = {
   _id: any;
   category: string;
   subCategories: string[]
}
