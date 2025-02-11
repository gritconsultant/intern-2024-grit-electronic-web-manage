import { defineStore } from "pinia";

interface State {
  token: string | null;
  userId: string | null;
  notification: boolean;
  orderstatus: boolean;
  paymentstatus: boolean;
  statusrefund: boolean;
}

export const useIndexStore = defineStore("index", {
  state: (): State => ({
    token: null,
    userId: null,
    notification: false,
    orderstatus: false,
    paymentstatus: false,
    statusrefund: false,
  }),
});
