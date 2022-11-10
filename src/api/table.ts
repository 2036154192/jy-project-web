import axios from "./index";
import {PageData} from "@/api/page";

//添加
export const Post = (url:string,params?:any) => {
    return axios.post(url,params)
}
//获取
export const Get = (url:string,params?:any) =>{
    return axios.get(url,params)
}
//删除
export const Delete = (url:string,params?:any) =>{
    return axios.delete(url,params)
}
//修改
export const Patch = (url:string,params?:any) =>{
    return axios.patch(url,params)
}