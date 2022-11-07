<template>
  <!-- 没有子节点，使用 el-menu-item 渲染 -->
  <el-menu-item
      v-if="!item[menuOptions.children] || !item[menuOptions.children].length"
      :index="item[menuOptions.id]"
  >
    <el-icon v-if="item[menuOptions.icon]">
      <Component :is="ElementPlusIconsVue[item[menuOptions.icon]]"/>
    </el-icon>
    <span>{{ item[menuOptions.title] }}</span>
  </el-menu-item>

  <!-- 有子节点，使用 el-sub-menu 渲染 -->
  <el-sub-menu
      v-else
      :index="item[menuOptions.id]"
  >
    <template #title>
      <el-icon v-if="item[menuOptions.icon]">
        <Component :is="ElementPlusIconsVue[item[menuOptions.icon]]"/>
      </el-icon>
      <span>{{ item[menuOptions.title] }}</span>
    </template>
    <!-- 循环渲染 -->
    <menu-item
        v-for="sub in item[menuOptions.children]"
        :key="sub[menuOptions.id]"
        :item="sub"
        :menu-options="menuOptions"/>
  </el-sub-menu>
</template>

<script lang="ts" setup>
import  {defineProps, PropType} from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

defineProps({
  item: {
    type: Object,
    required: true
  },
  menuOptions: {
    type: Object,
    required: true
  }
})
</script>

<style scoped lang="scss">
</style>
