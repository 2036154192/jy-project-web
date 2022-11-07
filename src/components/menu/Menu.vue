<template>
  <el-menu v-bind="$attrs">
    <infinite-menu-item
        v-for="(item, index) in data"
        :key="index"
        :item="item"
        :menu-options="menuOptions"/>
  </el-menu>
</template>

<script lang="ts" setup>
import InfiniteMenuItem from './components/MenuItem.vue'
import {defineProps, onMounted, PropType, ref} from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  menuOptions: {
    type: Object,
    required: false,
    default: () => ({
      title: 'title',
      id: 'id',
      icon: 'icon',
      children: 'children'
    })
  }
})

</script>

<style scoped lang="scss">
</style>
