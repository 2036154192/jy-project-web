//获取token判断用户是否登录状态
export default class Token{
    get(){
        return localStorage.getItem('token')
    }
    set(token:string){
        localStorage.setItem('token',token)
    }
    isLoggedIn(){
        return Boolean(localStorage.getItem('token'))
    }
    delete(){
        localStorage.removeItem('token')
    }
}