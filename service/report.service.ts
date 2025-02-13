import type { ParamsReport } from "~/models/report.model";
import { client } from "./httpClient";

export const getDashBoard = () => {
    return client({
        url: "/dashboard",
        method: "GET",
    });
}

export const getSaleReport = (params : ParamsReport) => {
    return client({
        url: "/report",
        method: "GET",
        params,
    });
}