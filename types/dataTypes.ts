type Product = {
   _id?: any;
   name: string;
   category: string;
   class: string;
}

type Category = {
   _id?: any;
   category: string;
   subCategories: string[]
}

export {
   Product,
   Category,
}
