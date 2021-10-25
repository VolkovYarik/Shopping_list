import { products } from "/data/products";

export default function handler(req, res) {
   const { productID } = req.query;

   if (req.method === 'DELETE') {
      const deletedProduct = products.find((elem) => parseInt(elem.id) === parseInt(productID));
      const index = products.findIndex((elem) => parseInt(elem.id) === parseInt(productID));
      products.splice(index, 1);
      res.status(200).json(deletedProduct);
   }
}