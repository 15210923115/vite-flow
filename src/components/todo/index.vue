<template>
  <div>
    <h1 text-center text-red>
      Todo List

      <div class="i-ep-aim"></div>
      <div class="i-zf-circle"></div>
    </h1>

    <div flex items-center justify-center>
      <input
        type="text"
        v-model="todo"
        shadow
        shadow-inset
        shadow-green-100
        h-35px
      />
      <button @click="addTodo" ml-10px bg-blue-100 rounded py-2>
        添加内容
      </button>
    </div>

    <TodoList :todos="todos" />
  </div>
</template>
<script setup lang="ts">
import TodoList from "./todo-list"

const todo = ref("")
const todos = ref<string[]>([])

const addTodo = () => {
  if (!todo.value) return
  else todos.value.push(todo.value)
}
</script>
