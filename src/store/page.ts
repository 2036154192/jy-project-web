import {defineStore} from "pinia";
import {getAllPage} from "@/api/page";
import {useRouter} from "vue-router";
import Router from "@/router";

export interface PageData{
    list:[]
    count:number
}

export const usePageStore = defineStore({
    id:'page',
    state:()=>{
        return {
            pageData:[],
            count:0,
            pageId:'home',

        }
    },
    persist:{
        enabled:true,
        strategies:[
            { storage: sessionStorage, paths: ['pageData','count','pageId'] }
        ]
    },
    actions: {
        createPageData(data:PageData){
            this.pageData = data.list
            this.count = data.count
        },
        async addRouter(){
            const router = useRouter()
            let data: PageData;
            data = <PageData>(await getAllPage()).data;
            this.pageData = data.list
            this.count = data.count
            this.addRouters()
        },
        addRouters(){
            this.pageData.forEach((item:{path:string,name:string,component:string,title:string}) => {
                Router.addRoute({
                    path:item.path,
                    name:item.name,
                    component:() => import("../"+item.component),
                    meta:{
                        title:item.title,
                        requireAuth: true
                    }
                })
            })
            Router.addRoute({
                path:'/:error*',
                redirect:'/404'
            })
        }
    }
})