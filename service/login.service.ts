import type { Login } from "~/models/page.model"
import { client } from "./httpClient"

export const login = (data: Login) => {
    return client({
        url: "/auth/login",
        method : "post",
        data: data
    })
}