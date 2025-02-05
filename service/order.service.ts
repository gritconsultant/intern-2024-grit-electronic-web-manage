import type { BankUpdate } from "~/models/order.model";
import { client } from "./httpClient";
import type { Params } from "~/models/client.model";

export const getOrderlist = (params: Params) => {
  return client({
    url: "/order",
    method: "GET",
    params,
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
