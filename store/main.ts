import { defineStore } from 'pinia';

interface State {
  token : string
  userId : string
  notification : boolean
  
}

export const useIndexStore = defineStore('index', {
  state: (): State => ({
    token:'',
    userId:'',
    notification : false,
   }),
})
