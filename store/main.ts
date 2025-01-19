import { defineStore } from 'pinia';

interface State {
  token : string
  userId : string
  notification : boolean
  orderstatus : boolean
  paymentstatus : boolean
  statusrefund : boolean
}

export const useIndexStore = defineStore('index', {
  state: (): State => ({
    token:'',
    userId:'',
    notification : false,
    orderstatus : false,
    paymentstatus : false,
    statusrefund : false,
   }),
})
