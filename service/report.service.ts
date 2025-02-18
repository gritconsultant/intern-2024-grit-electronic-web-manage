import type { AddBanner, ParamsBanner, ParamsCategory, ParamsLogs, ParamsReport } from "~/models/report.model";
import { client } from "./httpClient";

export const getDashBoard = () => {
    return client({
        url: "/dashboard",
        method: "GET",
    });
}

export const getDashBoardCategory = (params: ParamsCategory) => {
    return client({
        url: "/dashboard/category",
        method: "GET",
        params,
    });
}

export const getSaleReport = (params : ParamsReport) => {
    return client({
        url: "/report",
        method: "GET",
        params,
    });
}


export const getListLogs = (params : ParamsLogs) => {
    return client({
        url: "/adminlog",
        method: "GET",
        params,
    });
}


export const getBanner = (params: ParamsBanner) => {
    return client({
        url: "/banner",
        method: "GET",
        params,
    });
}

export const addBanner = (datas :AddBanner) => {
    return client({
        url: "/banner/create",
        method: "POST",
        data: datas,
    });
}

export const deleteBanner = (id: any) => {
    return client({
        url: `/banner/${id}`,
        method: "DELETE",
    });
}