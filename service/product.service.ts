//สำคัญ

import { client } from "./httpClient"
import type { Params } from "~/models/client.model"

export const getProductList = (param :Params) => {
    return client({
        url: "/product",
        method : "GET",
        params: param,
})
}

