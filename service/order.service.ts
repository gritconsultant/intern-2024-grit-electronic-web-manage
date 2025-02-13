import type { BankUpdate, UpdateStatusOrder,Params } from "~/models/order.model";
import { client } from "./httpClient";

export const getOrderlist = (params: Params) => {
  return client({
    url: "/order",
    method: "GET",
    params,
  });
};

export const getOrderById = (id: any) => {
  return client({
    url: `/order/${id}`,
    method: "GET",
  });
}

export const updateStatusOrder = (id:any, datas: UpdateStatusOrder) => {
  return client({
    url: `/order/${id}`,
    method: "PATCH",
    data: datas,
  });
};
////////////////////////////////////////////////////////////////

export const getBanklist = () => {
  return client({
    url: "/system",
    method: "GET",
  });
};

export const getBankById = (id: any) => {
  return client({
    url: `/system/${id}`,
    method: "GET",
  });
};

export const updateBank = (id: any, datas: BankUpdate) => {
  return client({
    url: `/system/${1}`,
    method: "PATCH",
    data: datas,
  });
};
