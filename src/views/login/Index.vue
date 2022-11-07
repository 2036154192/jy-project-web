<template>
  <div class="index">
    <div class="centerBox">
      <dark style="position: absolute;top:0;right:0;"></dark>
      <div style="width: 100%;text-align: center;margin-bottom: 10px;">
        <h3 style="color:var(--el-table-text-color)">登录</h3>
      </div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="70px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
        style="width: 330px;height: 110px;"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入账号" clearable />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" clearable />
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" style="width: 100%;" @click="submitForm(ruleFormRef)">登录</el-button>
      </div>
      <div style="width: 100%;margin-top: 10px;text-align: right;">
        <a @click="router.push({name:'Resgister'})">注册</a>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {login} from "@/api/user";
import Dark from "@/components/Dark.vue";
import {ElMessage, FormInstance, FormRules} from "element-plus";
import {useRoute, useRouter} from "vue-router";
import Token from "@/utils/Token";

const route = useRoute()
const router = useRouter()

onMounted(()=>{
  //清空页面存储
  localStorage.clear()
  sessionStorage.clear()
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入账号', trigger: 'change' },
    // { min: 6, max: 50, message: '最小长度6最大50', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入用密码', trigger: 'change' },
    // { min: 6, max: 20, message: '最小长度6最大20', trigger: 'blur' },
  ],
})

const ruleFormRef = ref<FormInstance>()

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      Login()
    } else {
      return false
    }
  })
}


const ruleForm = reactive({
  username:'',
  password:''
})

const formSize = ref('default')

const btnClick = () => {
  console.log('用户名：',ruleForm.username)
  console.log('密码：',ruleForm.password)
  if(ruleForm.username && ruleForm.password){
    Login()
  }else{
    ElMessage({
      message: '请输入用户名或密码',
      type: 'warning',
    })
  }
}

const Login = async () => {
  const myData = await login(ruleForm)
  if(myData.code === 200){
    const token = new Token()
    token.set(myData.data.token)
    router.push({name:'Home'})
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