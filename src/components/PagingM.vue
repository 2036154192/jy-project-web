<template>
  <div class="index">
    <el-pagination
        v-model:currentPage="paging.currentPage"
        v-model:page-size="paging.pageSize"
        :page-sizes="props.sectionSize"
        :small="props.small"
        :disabled="props.disabled"
        :background="props.background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paging.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts" setup>
import {reactive, ref, watch} from "vue";

/*
* currentPage 当前页
* pageSize 当前每页最大数量
* sectionSize 页面数量选项数组
* total 总共多少条数据
* small 是否用小型样式
* disabled 是否禁用分页
* background 是否为分页按钮添加背景色
* */

interface Props {
  currentPage?:number,
  pageSize?:number,
  sectionSize?:number[],
  total?:number,
  small?:boolean,
  disabled?:boolean,
  background?:boolean,
}
const props = withDefaults(defineProps<Props>(),{
  currentPage:1,
  pageSize:10,
  sectionSize:()=>[10,20,30],
  total:0,
  small:false,
  disabled:false,
  background:true
})

//emit回到父组件
const emit = defineEmits(['onChange']);

const paging = reactive({
  currentPage:props.currentPage,
  pageSize:props.pageSize,
  total:props.total,
})

emit('onChange',paging)

const handleSizeChange = (val: number) => {
  paging.pageSize = val
  emit('onChange',paging)
}
const handleCurrentChange = (val: number) => {
  paging.currentPage = val
  emit('onChange',paging)
}

watch(()=>props.total,(nVal)=>{
  paging.total = nVal
})

// 暴露方法，父组件可以通过ref获取
defineExpose({})
</script>
<style lang="scss" scoped>

</style>