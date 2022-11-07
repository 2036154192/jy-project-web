<template>
  <div class="index">
    <div class="configuration">
      <el-button type="primary" @click="onAddPage({})">新增</el-button>,mmmmAADFXX
    </div>
    <el-table
        :data="pageData"
        style="width: 100%;"
        max-height="100%"
        row-key="id"
        border
        @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column prop="title" label="标题" width="200"></el-table-column>
      <el-table-column prop="icon" label="图标" width="180"></el-table-column>
      <el-table-column prop="jurisdiction" label="权限" width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" width="200"></el-table-column>
      <el-table-column prop="path" label="路由路径" width="auto"></el-table-column>
      <el-table-column prop="component" label="组件路径" width="auto"></el-table-column>
      <el-table-column fixed="right" label="操作" width="160" align="center">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="onRedactPage(scope)">编辑</el-button>
          <el-popconfirm
              title="确定永久删除？"
              @confirm="onDeletePage(scope)">
            <template #reference>
              <el-button link type="primary" size="small">删除</el-button>
            </template>
          </el-popconfirm>
          <div>
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-button link type="primary" size="small">更多</el-button>
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="onAddChildren(scope)">添加子</el-dropdown-item>
                  <el-dropdown-item @click="onAddSibling(scope)">添加同级</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <page-form ref="pageForm"></page-form>
  </div>
</template>
<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {nextTick, reactive, ref} from "vue";
import {usePageStore} from "@/store/page";
import {toTree} from "@/utils";
import PageForm from "@/views/pageConfig/model/PageForm.vue";
import {deletePage} from "@/api/page";
import {ElMessage} from "element-plus";

const route = useRoute()
const router = useRouter()

let pageData = reactive([])
const multipleSelection = ref<any[]>([])
const pageStore = usePageStore()
pageData = toTree(pageStore.pageData)

const pageForm = ref<InstanceType<typeof PageForm>>()

const handleSelectionChange = (val:any[]) => {
  multipleSelection.value = val
}

const onAddPage = (val:object) => {
  pageForm.value?.openForm(val,1)
}

const onDeletePage = (data:any) => {
  deletePage(data.row.id).then(res => {
    if(res.code === 200){
      ElMessage({
        message: '成功',
        type: 'success',
      })
      location.reload()
    }else{

    }
  }).catch(err => {
    console.log(err)
  })
}

const onRedactPage = (data:any) => {
  pageForm.value?.openForm(data.row,2)
}

const onAddChildren = (data:any) =>{
  pageForm.value?.openForm({ pid:data.row.id },1)
}

const onAddSibling = (data:any) =>{
  pageForm.value?.openForm({ pid:data.row.pid },1)
}

</script>
<style lang="scss" scoped>
.index{
  width: calc(100% - 20px);
  height: 100%;
  padding: 10px;
  .configuration{
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .el-dropdown-link{
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .el-icon--right {
    color: var(--el-color-primary);
    margin: 0;
  }
}
</style>