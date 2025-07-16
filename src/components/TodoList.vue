<template>
  <div class="max-w-2xl mx-auto">
    <div class="bg-white rounded-lg shadow-lg">
      <!-- 添加新待办事项 -->
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">待办事项</h2>
        <form @submit.prevent="handleAddTodo" class="flex gap-2">
          <input
            v-model="newTodoText"
            type="text"
            placeholder="添加新的待办事项..."
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            :disabled="!newTodoText.trim()"
          >
            添加
          </button>
        </form>
      </div>

      <!-- 过滤器 -->
      <div class="p-4 border-b border-gray-200 bg-gray-50">
        <div class="flex items-center justify-between">
          <div class="flex space-x-2">
            <button
              v-for="filterOption in filterOptions"
              :key="filterOption.value"
              @click="setFilter(filterOption.value)"
              class="px-3 py-1 text-sm font-medium rounded-md transition-colors"
              :class="[
                filter === filterOption.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              ]"
            >
              {{ filterOption.label }}
            </button>
          </div>
          <div class="text-sm text-gray-600">
            {{ activeTodosCount }} 个待完成 / {{ totalTodosCount }} 个总计
          </div>
        </div>
      </div>

      <!-- 待办事项列表 -->
      <div class="divide-y divide-gray-200">
        <div v-if="filteredTodos.length === 0" class="p-8 text-center text-gray-500">
          <div class="text-lg mb-2">📝</div>
          <div>{{ getEmptyMessage() }}</div>
        </div>
        
        <TodoItem
          v-for="todo in filteredTodos"
          :key="todo.id"
          :todo="todo"
          @toggle="handleToggle"
          @remove="handleRemove"
          @update="handleUpdate"
        />
      </div>

      <!-- 底部操作 -->
      <div v-if="todos.length > 0" class="p-4 bg-gray-50 border-t border-gray-200">
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-600">
            {{ completedTodosCount }} 个已完成
          </span>
          <button
            v-if="completedTodosCount > 0"
            @click="clearCompleted"
            class="text-red-600 hover:text-red-800 font-medium transition-colors"
          >
            清除已完成
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TodoItem from './TodoItem.vue'
import { useTodoStore } from '../stores/todo'
import type { Todo } from '../stores/todo'

const todoStore = useTodoStore()
const newTodoText = ref('')

const {
  filteredTodos,
  activeTodosCount,
  completedTodosCount,
  totalTodosCount,
  filter
} = todoStore

const filterOptions = [
  { value: 'all', label: '全部' },
  { value: 'active', label: '待办' },
  { value: 'completed', label: '已完成' }
]

const handleAddTodo = () => {
  if (newTodoText.value.trim()) {
    todoStore.addTodo(newTodoText.value)
    newTodoText.value = ''
  }
}

const handleToggle = (id: number) => {
  todoStore.toggleTodo(id)
}

const handleRemove = (id: number) => {
  todoStore.removeTodo(id)
}

const handleUpdate = (id: number, text: string) => {
  todoStore.updateTodoText(id, text)
}

const setFilter = (newFilter: 'all' | 'active' | 'completed') => {
  todoStore.setFilter(newFilter)
}

const clearCompleted = () => {
  todoStore.clearCompleted()
}

const getEmptyMessage = () => {
  switch (filter.value) {
    case 'active':
      return '没有待办的待办事项'
    case 'completed':
      return '没有已完成的待办事项'
    default:
      return '还没有待办事项，快来添加一个吧！'
  }
}
</script>