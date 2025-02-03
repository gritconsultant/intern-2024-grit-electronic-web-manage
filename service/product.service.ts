//สำคัญ

import type {
  CategoryCreate,
  CategoryUpdate,
  ProductCreate,
  ProductUpdate,
} from "~/models/product.model";
import { client } from "./httpClient";
import type { Params } from "~/models/client.model";

export const getProductList = (params: Params) => {
  return client({
    url: "/product",
    method: "GET",
    params,
  });
};

export const getProductById = (id: any) => {
  return client({
    url: `/product/${id}`,
    method: "GET",
  });
};

export const createProduct = (datas: ProductCreate) => {
  return client({
    url: "/product/create",
    method: "POST",
    data: datas,
  });
};

export const updateProduct = (id: any, datas: ProductUpdate) => {
  return client({
    url: `/product/${id}`,
    method: "PATCH",
    data: datas,
  });
};

export const deleteProduct = (id: any) => {
  return client({
    url: `/product/${id}`,
    method: "DELETE",
  });
};

export const getCategoryList = (params: Params) => {
  return client({
    url: "/category",
    method: "GET",
    params,
  });
};

export const getCategoryById = (id: any) => {
  return client({
    url: `/category/${id}`,
    method: "GET",
  });
};

export const createCategory = (datas: CategoryCreate) => {
  return client({
    url: "/category/create",
    method: "POST",
    data: datas,
  });
};

export const updateCategory = (id: any, datas: CategoryUpdate) => {
  return client({
    url: `/category/${id}`,
    method: "PATCH",
    data: datas,
  });
};

export const deleteCategory = (id: any) => {
  return client({
    url: `/category/${id}`,
    method: "DELETE",
  });
};
