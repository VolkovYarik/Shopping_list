import axios, { AxiosInstance } from "axios";
import { Category, Product } from "../types/dataTypes";
import { CategoriesResponse, CategoryForm, ProductForm, ProductsResponse } from "types/axiosApiTypes";

const DEV_URL: string = process.env.DEV_URL || "http://localhost:3000";

export const instance: AxiosInstance = axios.create({
   baseURL: `${DEV_URL}/api`,
});

export const getAllCategories = (): Promise<Category[]> => {
   return instance.get<CategoriesResponse>('/categories').then((res) => res.data.data);
};

export const addNewCategory = (body: CategoryForm): Promise<any> => {
   return instance.post('/categories', body)
};

export const createNewProduct = (body: ProductForm): Promise<any> => {
   return instance.post('/products', body)
};

export const deleteProductByID = (id: string | number): Promise<any> => {
   return instance.delete(`/products/${id}`);
};

export const editProductByID = (id: string | number, body: ProductForm): Promise<any> => {
   return instance.patch(`/products/${id}`, body);
}

export const getAllProducts = (): Promise<Product[]> => {
   return instance.get<ProductsResponse>('/products').then(res => res.data.data);
};

export const uploadProductImage = (file: FormData): Promise<any> => {
   return instance.put('/upload', file, {
      headers: {
         'content-type': 'multipart/form-data',
      }
   })
}