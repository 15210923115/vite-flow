<template>
  <div>
    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>

    <br />

    <router-view></router-view>

    <Todo />
  </div>
</template>

<script setup lang="ts">
// 导入.vue文件时，.vue不能省略了，因为.vue文件本身就是通过env.d.ts配置出来的，省略了的话，ts就识别不了.vue文件了
import Todo from "@/components/todo/index.vue"
</script>

<style scoped></style>
