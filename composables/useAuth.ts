import service from "~/service";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();

export const verify = async () => {
    await service.user.getUserInfo()
    .then((resp: any) => {
      const data = resp.data.data;
      console.log(data.ID);
      store.$state.userId = data.ID;
      store.$state.token = data.token;
    })
    .catch((error: any) => {
       console.error(error);
     })
     .finally(() => {});
}