<template>
  <div class="index">
    <div class="configuration">
      <el-button type="primary" @click="onAddPage({})">新增</el-button>
    </div>
    <el-table
        :data="table.data"
        style="width: 100%;"
        max-height="100%"
        row-key="id"
        border
        @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column prop="title" label="标题" width="200" align="center"></el-table-column>
      <el-table-column prop="subhead" label="副标题" width="180" align="center"></el-table-column>
      <el-table-column prop="code" label="唯一值" width="180" align="center"></el-table-column>
      <el-table-column prop="img" label="封面" width="200">
        <template #default="scope">
          <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.img"
              :preview-src-list="[scope.row.img]"
              fit="cover"
              :lazy="true"
              z-index="9999"
          />
        </template>
      </el-table-column>
      <el-table-column prop="audio" label="音频" width="auto">
        <template #default="scope">
          <audio controls :src="scope.row.audio"/>
        </template>
      </el-table-column>
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
    <paging-m @onChange="onChange" :total="table.total"></paging-m>
    <nfc-form ref="nfcForm"></nfc-form>
  </div>
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import NfcForm from "@/views/nfcConfig/model/NfcForm.vue";
import {deletePage} from "@/api/page";
import {ElMessage} from "element-plus";
import {deleteNfc} from "@/api/nfc";
import {Get} from "@/api/table";
import PagingM from "@/components/PagingM.vue";
import {NfcDto, TablePaging} from "@/dto";
import {bufferTransitionImg} from "@/utils";

const nfcForm = ref<InstanceType<typeof NfcForm>>()
const onAddPage = (val:object) => {
  nfcForm.value?.openForm(val,1)
}

const multipleSelection = ref<any[]>([])
const handleSelectionChange = (val:any[]) => {
  multipleSelection.value = val
}

const table = reactive({
  data:<NfcDto>[],
  total:0
})
const url = reactive({
  get:'/nfc'
})

const onChange = (data:any)=>{
  Get(url.get,data).then(res => {
    if(res.code === 200){
      let data = <TablePaging>res.data
      table.total = data.count
      table.data = <NfcDto>data.list
    }
  })
}

const onDeletePage = (data:any) => {
  deleteNfc(data.row.id).then(res => {
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
  nfcForm.value?.openForm(data.row,2)
}

const onAddChildren = (data:any) =>{
  nfcForm.value?.openForm({ pid:data.row.id },1)
}

const onAddSibling = (data:any) =>{
  nfcForm.value?.openForm({ pid:data.row.pid },1)
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