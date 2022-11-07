<template>
  <div class="index">
    <div class="centerBox">
      <dark style="position: absolute;top:0;right:0;"></dark>
      <div style="width: 100%;text-align: center;margin-bottom: 10px;">
        <h3 style="color:var(--el-table-text-color)">注册</h3>
      </div>
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="80px"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
          style="width: 330px;height: 160px;"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入账号" clearable />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" clearable autocomplete="off"/>
        </el-form-item>
        <el-form-item label="再次密码" prop="password2">
          <el-input v-model="ruleForm.password2" type="password" placeholder="请输入再次密码" clearable autocomplete="off"/>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" style="width: 100%;" @click="submitForm(ruleFormRef)">注册</el-button>
      </div>
      <div style="width: 100%;margin-top: 10px;text-align: right;">
        <a @click="router.push({name:'Login'})">登录</a>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import {login, register} from "@/api/user";
import Dark from "@/components/Dark.vue";
import {ElMessage, FormInstance, FormRules} from "element-plus";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

const ruleFormRef = ref<FormInstance>()

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      onRegister()
    } else {
      return false
    }
  })
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入再次密码'))
  } else {
    if (ruleForm.password2 !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入再次密码'))
  } else if (value !== ruleForm.password) {
    callback(new Error("两次密码不一致"))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 5, max: 20, message: '最小长度6最大50', trigger: 'blur' },
  ],
  password: [
    { required: true , message:'请输入密码' , },
    { validator: validatePass,trigger: 'blur' },
    { min: 6, max: 20, message: '最小长度6最大20', trigger: 'blur' },
  ],
  password2: [
    { required: true , message:'请输入再次密码' ,},
    { validator: validatePass2 , trigger: 'blur' },
    { min: 6, max: 20, message: '最小长度6最大20', trigger: 'blur' },
  ],
})

const ruleForm = reactive({
  username:'',
  password:'',
  password2:'',
  avatar:'',
  email:''
})

const formSize = ref('default')

const onRegister =async ()=>{
  const data = await register(ruleForm)
  if(data.code === 200){
    router.push({name:"Login"})
  }
}
</script>
<style lang="scss" scoped>
@import "../../styles/base";

.index {
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: url("../../assets/images/bg.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-position: center;

  .centerBox {
    @include vertical_center;
    padding: 100px;
    border-radius: 10px;
    background: var(--el-bg-color);
  }
}
</style>