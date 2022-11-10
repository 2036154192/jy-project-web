// 数据返回的接口
// 定义请求响应参数，不含data
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {ElMessage} from "element-plus";
import Token from "@/utils/Token";
import router from "@/router";

interface Result {
    code:number,
    mag:string
}

// 请求响应参数，包含data
interface ResultData<T = any> extends Result{
    data?:T
}
// const URL: string = "http://8.136.203.217:1314/web"
const URL: string = "http://localhost:1314/web"

enum RequestEnums{
    TIMEOUT = 20000,
    OVERDUE = 600, // 登录失效
    FAIL = 500, // 请求失败
    SUCCESS = 200, // 请求成功
}
const config = {
    // 默认地址
    baseURL: URL,
    // 设置超时时间
    timeout: RequestEnums.TIMEOUT as number,
    // 跨域时候允许携带凭证
    withCredentials: false,
}

const toeknC = new Token()

class RequestHttp{
    // 定义成员变量并指定类型
    service: AxiosInstance;
    constructor(config:AxiosRequestConfig) {
        //实例化axios
        this.service = axios.create(config);
        /**
         * 请求拦截器
         * 客户端发送请求 -> [请求拦截器] -> 服务器
         * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
         */
        this.service.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                const token = toeknC.get() || '';
                return {
                    ...config,
                    headers: {
                        'Authorization':'Bearer '+ token, // 请求头中携带token信息
                    }
                }
            },
            (error: AxiosError) => {
                // 请求报错
                Promise.reject(error)
            }
        )

        /**
        * 响应拦截器
         * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
          */
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                const {data, config} = response; // 解构
                // if (data.code === RequestEnums.OVERDUE) {
                //     // 登录信息失效，应跳转到登录页面，并清空本地的token
                //     localStorage.setItem('token', '');
                //     // router.replace({
                //     //  path: '/login'
                //     // })
                //     return Promise.reject(data);
                // }
                // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
                if(data.code === RequestEnums.FAIL){
                    ElMessage.error('服务器异常'); // 此处也可以使用组件提示报错信息
                    return Promise.reject(data)
                }
                return data;
            },
            (error: AxiosError) => {
                const {response} = error;
                if (response) {
                    // @ts-ignore
                    let message = response.data.message
                    if(response.status === 401){
                        toeknC.delete()
                        message = '登录过期'
                        router.push({name:'Login'})
                    }
                    ElMessage({
                        message: message,
                        type: 'warning',
                    })
                    return
                }
                if (!window.navigator.onLine) {
                    ElMessage.error('网络连接失败');
                    return router.replace({
                    path: '/404'
                    });
                }
            }
        )
    }
    // 常用方法封装
    get<T>(url: string, params?: any): Promise<ResultData<T>> {
        return this.service.get(url, {params});
    }
    post<T>(url: string, params?: any): Promise<ResultData<T>> {
        return this.service.post(url, params);
    }
    put<T>(url: string, params?: any): Promise<ResultData<T>> {
        return this.service.put(url, params);
    }
    patch<T>(url: string, params?: any): Promise<ResultData<T>> {
        return this.service.patch(url, params);
    }
    delete<T>(url: string, params?: any): Promise<ResultData<T>> {
        return this.service.delete(url, {params});
    }
}

export default new RequestHttp(config)