import axios, { AxiosInstance } from "axios";
import { ICategory, IProduct } from "../types/dataTypes";
import { CategoriesResponseType, ProductsResponseType } from "types/axiosApiTypes";

const DEV_URL: string = process.env.DEV_URL || "http://localhost:3000";

export const instance: AxiosInstance = axios.create({
   baseURL: `${DEV_URL}/api`,
});

export const getAllCategories = (): Promise<ICategory[]> => {
   return instance.get<CategoriesResponseType>('/categories').then((res) => res.data.data);
};

export const addNewCategory = (body: ICategory): Promise<any> => {
   return instance.post('/categories', body)
};

export const createNewProduct = (body: IProduct): Promise<any> => {
   return instance.post('/products', body)
};

export const deleteProductByID = (id: string | number): Promise<any> => {
   return instance.delete(`/products/${id}`);
};

export const getAllProducts = (): Promise<IProduct[]> => {
   return instance.get<ProductsResponseType>('/products').then(res => res.data.data);
};