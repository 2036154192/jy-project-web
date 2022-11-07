<template>
  <div>
    首页
  </div>
</template>
<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {reactive} from "vue";

const route = useRoute()
const router = useRouter()

const data = reactive({})
</script>
<style lang="scss" scoped>

</style>