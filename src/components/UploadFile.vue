<template>
  <div class="index">
    <el-button @click="goFile" size="small" type="primary">
      <el-icon><Plus /></el-icon>
      {{state.ruleForm.documentFile ? props.succeedTitle : props.title}}
    </el-button>
    <input
      style="display: none"
      id="file"
      ref="files"
      type="file"
      @change="uploadData(e)"
      :accept="props.accept"
      :multiple="props.multiple"
    />
  </div>
</template>

<script lang="ts" setup>
// 先在vue 中获取 ref
import { toRefs, ref, reactive } from "vue";
import {ElMessage} from "element-plus";

/*
* accept:<image/*(全部图片) | audio/*(全部音频) | video/*(全部视频) |  .xxx, (规定某个或多个)>
* size:文件最大限制M
* multiple:是否支持多选
 */
interface PropsType{
  accept?:string,
  size?:number,
  modelValue?:any,
  multiple?:boolean,
  title?:string,
  succeedTitle?:string,
}
const props = withDefaults(defineProps<PropsType>(),{
  accept:"image/*",
  size:10,
  value:'',
  multiple:false,
  title:'上传文件',
  succeedTitle:'上传成功',
})

const emits = defineEmits(['update:modelValue'])

const state = reactive({
  loading: false,
  pageInfo: {
    page: 1,
    rows: 10,
    total: 0,
  },
  ruleForm:{
    documentFile:null
  }
});

const files = ref<null | HTMLElement>(null);
const goFile = () => {
  files.value!.click();
};
// 获取文件 这里是使用的 vue3.0 语法
const uploadData = (e:any) => {
  let myE = window.event || e
  console.log(myE.target.files)
  if (myE.target.files[0].size > props.size * 1024 * 1024) {
    // 限制文件上传大小
    ElMessage.error("上传单个文件大小不能超过 "+props.size+"M!");
  } else {
    state.ruleForm.documentFile = myE.target.files[0]; // 文件赋值
    getBase64(state.ruleForm.documentFile).then(res => {
      console.log(res)
      emits('update:modelValue',res)
      ElMessage({
        message: myE.target.files[0].name,
        type: 'success',
      })
    },rej =>{
      ElMessage.error(rej)
    })
  }
};

const getBase64 = (file:any) => {
  return new Promise((resolve, reject) => {
    ///FileReader类就是专门用来读文件的
    const reader = new FileReader()
    //开始读文件
    //readAsDataURL: dataurl它的本质就是图片的二进制数据， 进行base64加密后形成的一个字符串，
    reader.readAsDataURL(file)
    // 成功和失败返回对应的信息，reader.result一个base64，可以直接使用
    reader.onload = () => resolve(reader.result)
    // 失败返回失败的信息
    reader.onerror = error => reject(error)
  })
}
</script>

<style lang="scss" scoped>
</style>