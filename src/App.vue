<template>
  <div class="home">
    <navigation-bar ref="navigation" v-if="isRouterActive"></navigation-bar>
    <div class="content">
      <router-view v-if="isRouterActive"></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {nextTick, onMounted, onUpdated, provide, ref, watch} from "vue";
import {userData, useUserStore} from "@/store/user";
import {getUserData} from "@/api/user";
import NavigationBar from '@/components/NavigationBar.vue'
const route = useRoute()
const router = useRouter()
const navigation = ref(null)

//获取用户信息并且存储local
const userStore = useUserStore()
getUserData().then(res =>{
  if (res.code === 200){
    userStore.createUserData(<userData>res.data)
  }
})

watch(()=>route.fullPath,(newVal)=>{
  router.replace(newVal)
})

const isRouterActive = ref(true)
provide('reload', () => {
  isRouterActive.value = false
  nextTick(() => {
    isRouterActive.value = true
  })
})

window.addEventListener('beforeunload',()=>{
  console.log('页面关闭刷新前')
})
window.addEventListener(('load'),()=>{
  console.log('页面关闭刷新后')
})
</script>

<style lang="scss" scoped>
.home{
  width: 100vw;
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  .content{
    width: 100%;
    flex: auto;
    overflow: hidden;
    background: var(--el-bg-color-page);
  }
}
</style>
