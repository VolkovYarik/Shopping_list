interface IProduct {
   _id?: any;
   name: string;
   category: string;
   class: string;
}

interface ICategory {
   _id?: any;
   category: string;
   subCategories: string[]
}

export {
   IProduct,
   ICategory,
}
