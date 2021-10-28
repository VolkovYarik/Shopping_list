import axios from "axios";

let DEV_URL = process.env.DEV_URL || "http://localhost:3000";

const instance = axios.create({
   baseURL: `${DEV_URL}/api`,
});

export const getAllCategories = () => {
   return instance.get('/categories').then(res => res.data.data);
};

export const addNewCategory = (body) => {
   return instance.post('/categories', body).then(res => res).catch(err => console.log(err));
};

export const createNewProduct = (body) => {
   return instance.post('/products', body).then(res => res);
};

export const deleteProductByID = (id) => {
   return instance.delete(`/products/${id}`);
};

export const getAllProducts = () => {
   return instance.get('/products').then(res => res.data.data);
};