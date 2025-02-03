import type { Params } from "~/models/client.model";
import { client } from "./httpClient";



export const getUserInfo = () => {
  return client({
      url: "/admin/info",
      method: "get",
  })
} 

export const getAdmintList = (params: Params) => {
  return client({
    url: "/admin",
    method: "GET",
    params,
  });
};

export const getAdminById = (id: any) => {
  return client({
    url: `/admin/${id}`,
    method: "GET",
  });
};

export const createAdmin = (datas: any) => {
  return client({
    url: "/admin/create",
    method: "POST",
    data: datas,
  });
};

export const deleteAdmin = (id: any) => {
  return client({
    url: `/admin/${id}`,
    method: "DELETE",
  });
};

export const updateAdmin = (datas: any) => {
  return client({
    url: "/admin/update",
    method: "PATCH",
    data: datas,
  });
};

export const getCustomertList = (params: Params) => {
  return client({
    url: "/user",
    method: "GET",
    params,
  });
};

export const getCustomerById = (id: any) => {
 return client({
    url: `/user/${id}`,
    method: "GET",
  });
}