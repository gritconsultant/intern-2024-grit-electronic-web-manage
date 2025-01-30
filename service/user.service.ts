import { client } from "./httpClient"

export const getAdmintList = () => {
    return client({
        url: "/admin",
        method: "GET",
    });
}

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
}

export const deleteAdmin = (id: any) => {
    return client({
        url: `/admin/${id}`,
        method: "DELETE",
    });
}

export const updateAdmin = (datas: any) => {
    return client({
        url: "/admin/update",
        method: "PATCH",
        data: datas,
    });
}




export const getCustomertList = () => {
    return client({
        url: "/user",
        method: "GET",
    });
}