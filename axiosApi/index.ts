import axios, { AxiosInstance } from "axios";
import { Category, Product } from "../types/dataTypes";
import { CategoriesResponse, ProductsResponse } from "types/axiosApiTypes";

const DEV_URL: string = process.env.DEV_URL || "http://localhost:3000";

export const instance: AxiosInstance = axios.create({
   baseURL: `${DEV_URL}/api`,
});

export const getAllCategories = (): Promise<Category[]> => {
   return instance.get<CategoriesResponse>('/categories').then((res) => res.data.data);
};

export const addNewCategory = (body: Category): Promise<any> => {
   return instance.post('/categories', body)
};

export const createNewProduct = (body: Product): Promise<any> => {
   return instance.post('/products', body)
};

export const deleteProductByID = (id: string | number): Promise<any> => {
   return instance.delete(`/products/${id}`);
};

export const getAllProducts = (): Promise<Product[]> => {
   return instance.get<ProductsResponse>('/products').then(res => res.data.data);
};