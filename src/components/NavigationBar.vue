<template>
  <div class="index">
    <div class="content">
      <div class="logo">
        <div class="img"></div>
        <h3 class="title">标题</h3>
      </div>
      <div class="menu">
        <my-menu
            :data="data.mockData"
            class="el-menu-demo"
            :default-active="pageStore.pageId"
            mode="horizontal"
            style="border-bottom: 0;"
            @select="handleSelect"
        ></my-menu>
      </div>
      <div class="user">
        <dark></dark>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Dark from "@/components/Dark.vue";
import MyMenu from "@/components/menu/Menu.vue"
import {useRoute, useRouter} from "vue-router";
import {reactive, watch} from "vue";
import {toTree} from "@/utils";
import {usePageStore} from "@/store/page";

const route = useRoute()
const router = useRouter()
const pageStore = usePageStore()

const data = reactive({
  mockData:[],
})

watch(()=>pageStore.pageData,(newVal)=>{
  setPageList()
})

const setPageList = ()=>{
  const pageList = toTree(pageStore.pageData)
  pageList.unshift(
      {
        component:"./views/index/Index.vue",
        createTime:"2022-09-29T09:01:46.000Z",
        icon:"House",
        id:"home",
        jurisdiction:"visitor",
        name:"Home",
        path:"/",
        pid:"0",
        title:"首页",
        updateTime:"2022-09-29T09:01:46.000Z"
      }
  )
  data.mockData = pageList
}

setPageList()

const handleSelect = (key: string, keyPath: string[]) => {
  pageStore.pageId = key
  data.mockData.forEach((item) => {
    const { path, id } = item;
    if (key === id) {
      router.push({path:path})
    }
  })
}

handleSelect(pageStore.pageId,[])

</script>
<style lang="scss" scoped>
.index {
  width: 100%;

  .content {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: solid 1px var(--el-menu-border-color);

    .logo {
      margin: 0 20px;
      display: flex;
      align-items: center;

      .img {
        width: 50px;
        height: 50px;
        background-image: url("../assets/images/jyLogo.png");
        background-size: 100% 100%;
        transform: scale(2);
      }

      .title {
        margin-left: 10px;
      }
    }

    .menu {
      flex: auto;
    }

    .user {
      margin-right: 20px;
    }
  }
}
</style>