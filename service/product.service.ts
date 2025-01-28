//สำคัญ

import type {  ProductCreate, ProductUpdate } from "~/models/product.model"
import { client } from "./httpClient"

export const getProductList = () => {
    return client({
        url: "/product",
        method : "GET",
})
}

export const getProductById = (id: any) => {
    return client({
        url: `/product/${id}`,
        method : "GET",
    })
}

export const createProduct = (datas: ProductCreate) =>{
    return client({
        url: "/product/create",
        method: "POST",
        data: datas
    })
}

export const updateProduct = (id: any, datas: ProductUpdate) => {
    return client({
        url: `/product/${id}`,
        method : "PATCH",
        data: datas,
    });
}



