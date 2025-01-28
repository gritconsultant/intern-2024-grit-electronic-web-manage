import type { Login } from "~/models/page.model"
import { client } from "./httpClient"

export const login = (payload: Login) => {
    return client({
        url: "/auth/login/admin",
        method : "post",
        data: payload
    })
}