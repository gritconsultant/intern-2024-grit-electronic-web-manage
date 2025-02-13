import { client } from "./httpClient";

export const getDashBoard = () => {
    return client({
        url: "/dashboard",
        method: "GET",
    });
}