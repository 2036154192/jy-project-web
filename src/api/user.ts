import axios from './'
// 用户登录
export const login = (params:any) => {
    // 返回的数据格式可以和服务端约定
    return axios.post('/auth/login', params);
}

//注册
export const register = (params:any) => {
    return axios.post('/user/create',params)
}

//获取用户信息
export const getUserData = () => {
    return axios.get('/user')
}
