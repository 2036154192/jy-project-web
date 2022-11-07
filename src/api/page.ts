import axios from "./index";

export interface PageData{
    name:string
    path:string
    component:string
    icon:string
    title:string
    jurisdiction:string
    pid:string
}

//添加页面
export const addPage = (params:PageData)=>{
    return axios.post('/page',params)
}

//获取全部页面
export const getAllPage = () => {
    return axios.get('/page')
}

//删除指定页面（单个及子）
export const deletePage = (params:string) => {
    return axios.delete('/page/'+params)
}

//修改页面
export const updatePage = (params:PageData) => {
    return axios.patch('/page',params)
}