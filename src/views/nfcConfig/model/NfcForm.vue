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
          <el-form-item label="唯一值：" prop="code">
            <el-input v-model="form.code" clearable placeholder="请输入唯一值"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标题：" prop="title">
            <el-input v-model="form.title" clearable placeholder="请输入标题"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="副标题：" prop="subhead">
            <el-input v-model="form.subhead" clearable placeholder="请输入副标题"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="封面：" prop="img">
            <upload-file v-model="form.img"></upload-file>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="音频：" prop="audio">
            <upload-file :size="50" accept="audio/*" v-model="form.audio"></upload-file>
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
import {ElMessage, FormInstance,UploadProps} from "element-plus";
import {addNfc,updateNfc} from "@/api/nfc";
import { NfcDto } from "@/dto";
import UploadFile from '@/components/UploadFile.vue'

let dialogFormVisible = ref(false)
const userStore = useUserStore()
const pageStore = usePageStore()
const formRef = ref<FormInstance>()
let loading = ref(false)
let myType:number = 0

let form = reactive({
  code: '',
  title: '',
  subhead: '',
  img: '',
  audio: ''
})
const rules = reactive({
  code: [{ required: true, message: '请输入唯一值', trigger: 'change' }],
  title: [{ required: true, message: '请输入标题', trigger: 'change' }],
  subhead: [{ required: true, message: '请输入副标题', trigger: 'change' }],
  img: [{ required: true, message: '请上传封面', trigger: 'change' }],
  audio: [{ required: true, message: '请上传音频', trigger: 'change' }],
})
let show = ref(true)

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
    console.log(form)
    // if (valid) {
    //   console.log('submit!',form)
    //   loading.value = true
    //   if(myType === 1){
    //     //新增
    //     addNfc(<NfcDto>form).then(res => {
    //       console.log(res)
    //       loading.value = false
    //       if(res.code === 200){
    //         dialogFormVisible.value = false
    //         ElMessage({
    //           message: '成功',
    //           type: 'success',
    //         })
    //         location.reload()
    //       }
    //     }).catch(err => {
    //       loading.value = false
    //     })
    //   }else if (myType === 2){
    //     //修改
    //     updateNfc(<NfcDto>form).then(res => {
    //       loading.value = false
    //       if(res.code === 200){
    //         dialogFormVisible.value = false
    //         ElMessage({
    //           message: '成功',
    //           type: 'success',
    //         })
    //         location.reload()
    //       }
    //     }).catch(err => {
    //       loading.value = false
    //     })
    //   }
    // }
  })
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  console.log(uploadFile,response);
  form.img = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
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