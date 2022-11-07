import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import Index from '../views/index/Index.vue'
import {useTitle} from "@vueuse/core";
import Token from "@/utils/Token";
import {usePageStore} from "@/store/page";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: ()=> import('@/views/home/Index.vue'),
        meta: {
            title: '首页',
            requireAuth: true,
        },
    },
    {
        path: '/user',
        name: 'User',
        children: [
            {
                path: 'login',
                name: 'Login',
                component: () => import('@/views/login/Index.vue'),
                meta: {
                    title: "登录",
                    requireAuth: false
                }
            },
            {
                path: 'register',
                name: 'Resgister',
                component: () => import('@/views/register/Index.vue')
            }
        ]
    },
    {
        path:"/404",
        name:"404",
        component:()=> import('@/views/Err404.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

const token = new Token()
router.beforeEach(async (to, from) => {
    console.log('前全局路由守卫', to, from)
    const pageSotre = usePageStore()
    if(token.isLoggedIn()){
        await pageSotre.addRouter()
    }
    if (to.meta.title) {
        let title: string = to.meta.title + ''
        useTitle(title)
    }
    if (to.meta.requireAuth && !token.isLoggedIn()) {
        return {
            path: '/user/login',
            query: {
                redirect: to.fullPath
            }
        }
    }else{
        if(token.isLoggedIn() && to.path === '/user/login' || to.path === '/user/register'){
            return {
                path: '/'
            }
        }
    }
})

export default router
