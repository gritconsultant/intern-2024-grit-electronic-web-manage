//สำคัญ

import { client } from "./httpClient"

export const getProductList = () => {
    return client({
        url: "/product",
        method : "GET",
})
}

