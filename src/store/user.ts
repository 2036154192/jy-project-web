import {defineStore} from "pinia";

export interface userData{
    avatar:string
    createTime:string
    email:string
    id:string
    nickname:string
    role:string
    updateTime:string
    username:string
}

export const useUserStore = defineStore({
    id: 'user', // id必填，且需要唯一
    state: () => {
        return {
            userData:<userData>{}
        }
    },
    persist:{
        enabled:true,
        strategies:[
            { storage: sessionStorage, paths: ['userData'] }
        ]
    },
    getters:{
      getUserJurisdiction():string{
          return this.userData.role
      }
    },
    actions: {
        createUserData(obj:userData){
          this.userData = obj
        },
    }
})