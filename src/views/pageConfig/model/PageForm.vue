<template>
  <el-dialog
      v-model="dialogFormVisible"
      title="页面配置"
  >
    <el-form
        :model="form"
        :rules="rules"
        ref="formRef"
        v-if="show"
        v-loading="loading"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="标题：" prop="title">
            <el-input v-model="form.title" clearable placeholder="请输入标题"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="图标：" prop="icon">
            <el-input v-model="form.icon" clearable placeholder="请输入图标"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权限：" prop="jurisdiction">
            <el-select
                v-model="form.jurisdiction"
                placeholder="请选择权限"
            >
              <el-option
                  v-for="item in options"
                  :key="item"
                  :label="item"
                  :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="父级：" prop="pid">
            <el-tree-select
                v-model="form.pid"
                :data="treeSelectData"
                check-strictly
                :render-after-expand="false"
                placeholder="请选择父级"
            ></el-tree-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="名称：" prop="name">
            <el-input v-model="form.name" clearable placeholder="请输入名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="路由：" prop="path">
            <el-input v-model="form.path" clearable placeholder="请输入路由路径"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组件：" prop="component">
            <el-input v-model="form.component" clearable placeholder="请输入组件路径"/>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="dialog-footer">
          <span>
            <el-button @click="dialogFormVisible = false">关闭</el-button>
            <el-button type="primary" @click="submitForm(formRef)">确定</el-button>
          </span>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script lang="ts" setup>
import {inject, nextTick, reactive, Ref, ref, toRef, toRefs, UnwrapRef} from "vue";
import {useUserStore} from "@/store/user";
import {usePageStore} from "@/store/page";
import {toTree} from "@/utils";
import {ElMessage, FormInstance} from "element-plus";
import {addPage, PageData, updatePage} from "@/api/page";

let dialogFormVisible = ref(false)
const userStore = useUserStore()
const pageStore = usePageStore()
const formRef = ref<FormInstance>()
let loading = ref(false)
let myType:number = 0

let form: object = reactive({
  title: '',
  icon: '',
  jurisdiction: '',
  pid: '',
  name: '',
  path: '',
  component:''
})
const rules = reactive({
  title: [{ required: true, message: '请输入页面名称', trigger: 'change' }],
  jurisdiction: [{ required: true, message: '请选择规则', trigger: 'change' }],
  pid: [{ required: true, message: '请选择父级', trigger: 'change' }],
  name: [{ required: true, message: '请输入路由名', trigger: 'change' }],
  path: [{ required: true, message: '请输入路由路径', trigger: 'change' }],
  component: [{ required: true, message: '请输入组件路径', trigger: 'change' }],
})
let show = ref(true)

let treeSelectData: { id: any; pid: any; label: any; value: any; }[] = reactive([])
pageStore.pageData.forEach(item => {
  const {pid, id,title} = item;
  treeSelectData.push({
    id:id,
    pid:pid,
    label:title,
    value:id
  })
})
treeSelectData.unshift({
  id:'123',
  pid:'0',
  label:'一级菜单',
  value:'0'
})
treeSelectData = toTree(treeSelectData)

const jurisdiction = {
  root:['root','admin','visitor'],
  admin:['admin','visitor'],
  options:['visitor']
}
let options = []
if(userStore.getUserJurisdiction){
  options = jurisdiction[userStore.getUserJurisdiction]
}

//方法
//清空列表内容
const emptyForm = () => {
  for (let formKey in form) {
    form[formKey] = ''
  }
}
//从新加载列表防止上次验证提示出现
const emptyVerify = () =>{
  show.value = false
  nextTick(()=>{
    show.value = true
  })
}

const openForm = (val:object,type:number) =>{
  emptyForm()
  emptyVerify()
  if(JSON.stringify(val) !== '{}'){
    form = Object.assign(form,val)
  }
  myType = type
  dialogFormVisible.value = true
}

//提交点击表单验证
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!',form)
      loading.value = true
      if(myType === 1){
        //新增
        addPage(<PageData>form).then(res => {
          console.log(res)
          loading.value = false
          if(res.code === 200){
            dialogFormVisible.value = false
            ElMessage({
              message: '成功',
              type: 'success',
            })
            location.reload()
          }
        }).catch(err => {
          loading.value = false
        })
      }else if (myType === 2){
        //修改
        updatePage(<PageData>form).then(res => {
          loading.value = false
          if(res.code === 200){
            dialogFormVisible.value = false
            ElMessage({
              message: '成功',
              type: 'success',
            })
            location.reload()
          }
        }).catch(err => {
          loading.value = false
        })
      }
    }
  })
}

defineExpose({
  openForm
})
</script>
<style lang="scss" scoped>
.el-select{
  width: 100%;
}
.dialog-footer{
  text-align: right;
}
</style>