import { products } from "/data/products";

export default function handler(req, res) {
   if (req.method === 'GET') {
      res.status(200).json(products);
   } else if (req.method === 'POST') {
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