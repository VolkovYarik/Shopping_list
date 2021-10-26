import { products } from "/data/products";

export default function handler(req, res) {
   switch (req.method) {
      case "GET":
         res.status(200).json(products);
         break;
      case "POST": {
         const product = req.body.product;
         const newProduct = {
            id: Date.now(),
            imgUrl: product.imgUrl,
            name: product.name,
            category: product.category,
            class: product.class
         };
         products.push(newProduct);
         res.status(201).json(newProduct);
      }
   }
}