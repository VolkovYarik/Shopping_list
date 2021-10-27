import axios from "axios";

const instance = axios.create({
   baseURL: "http://localhost:3000/api",
});

export const getAllProducts = () => {
   return instance.get('/products').then(res => res.data);
};

export const getAllCategories = () => {
   return instance.get('/categories').then(res => res.data);
};

export const createNewProduct = (body) => {
   return instance.post('/products', body).then(res => res.data);
};

export const deleteProductByID = (id) => {
   return instance.delete(`/products/${id}`);
};