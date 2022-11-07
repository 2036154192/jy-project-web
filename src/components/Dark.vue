<template>
  <el-button
      style="z-index: 2"
      @click="toggleDark()">
    <template v-if="isDask">
      <el-icon><Moon /></el-icon>
    </template>
    <template v-else>
      <el-icon><Sunny /></el-icon>
    </template>
  </el-button>
</template>

<script lang="ts" setup>
import {useDark, useToggle} from "@vueuse/core";
const isDask = useDark()
const toggleDark = useToggle(isDask)
</script>