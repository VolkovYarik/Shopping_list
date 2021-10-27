import axios from "axios";

let DEV_URL = process.env.DEV_URL || "http://localhost:3000";

const instance = axios.create({
   baseURL: `${DEV_URL}/api`,
});

export const getAllCategories = () => {
   return instance.get('/categories').then(res => res.data);
};

export const createNewProduct = (body) => {
   return instance.post('/products', body).then(res => res.data);
};

export const deleteProductByID = (id) => {
   return instance.delete(`/products/${id}`);
};

//requests to database

export const getAllProducts = () => {
   return instance.get('/products').then(res => res.data.data);
};