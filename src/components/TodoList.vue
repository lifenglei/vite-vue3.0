<template>
  <div class="max-w-4xl mx-auto">
    <div class="card-modern glass-effect overflow-hidden">
      <!-- 头部标题和添加区域 -->
      <div class="bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-xl border-b border-white/20 p-8">
        <div class="flex items-center mb-6">
          <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            我的任务列表
          </h2>
        </div>
        
        <form @submit.prevent="handleAddTodo" class="flex gap-3">
          <div class="flex-1 relative">
            <input
              v-model="newTodoText"
              type="text"
              placeholder="今天想要完成什么呢？"
              class="w-full px-6 py-4 bg-white/80 backdrop-blur-lg border-2 border-gray-200/50 rounded-2xl focus:outline-none focus:border-blue-400 focus:bg-white custom-input text-gray-800 placeholder-gray-500 text-lg font-medium"
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
          </div>
          <button
            type="submit"
            class="px-8 py-4 btn-primary text-white rounded-2xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            :disabled="!newTodoText.trim()"
          >
            <span class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              添加任务
            </span>
          </button>
        </form>
      </div>

      <!-- 过滤器和统计 -->
      <div class="bg-gradient-to-r from-gray-50/80 to-gray-100/60 backdrop-blur-xl border-b border-gray-200/30 p-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="filterOption in filterOptions"
              :key="filterOption.value"
              @click="setFilter(filterOption.value)"
              class="px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
              :class="[
                todoStore.filter === filterOption.value
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white/70 text-gray-700 hover:bg-white/90 hover:shadow-md border border-gray-200/50'
              ]"
            >
              <span class="flex items-center">
                <span class="mr-2">{{ getFilterIcon(filterOption.value) }}</span>
                {{ filterOption.label }}
              </span>
            </button>
          </div>
          
          <div class="flex items-center space-x-4 text-sm">
            <div class="flex items-center bg-white/70 rounded-full px-4 py-2 border border-gray-200/50">
              <div class="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span class="text-gray-600 font-medium">{{ todoStore.activeTodosCount }} 待完成</span>
            </div>
            <div class="flex items-center bg-white/70 rounded-full px-4 py-2 border border-gray-200/50">
              <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span class="text-gray-600 font-medium">{{ todoStore.totalTodosCount }} 总计</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 任务列表 -->
      <div class="min-h-[400px]">
        <div v-if="todoStore.filteredTodos.length === 0" class="flex flex-col items-center justify-center py-16 px-8">
          <div class="text-6xl mb-4 opacity-50">{{ getEmptyIcon() }}</div>
          <div class="text-xl font-semibold text-gray-600 mb-2">{{ getEmptyMessage() }}</div>
          <div class="text-gray-500 text-center max-w-md">
            {{ getEmptySubMessage() }}
          </div>
        </div>
        
        <div v-else class="divide-y divide-gray-100/50">
          <TransitionGroup name="todo-list" tag="div">
            <div 
              v-for="(todo, index) in todoStore.filteredTodos"
              :key="todo.id"
              class="animate-slide-in-left"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <TodoItem
                :todo="todo"
                @toggle="handleToggle"
                @remove="handleRemove"
                @update="handleUpdate"
              />
            </div>
          </TransitionGroup>
        </div>
      </div>

      <!-- 底部操作区 -->
      <div v-if="todoStore.todos.length > 0" class="bg-gradient-to-r from-gray-50/80 to-gray-100/60 backdrop-blur-xl border-t border-gray-200/30 p-6">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center text-sm">
            <div class="flex items-center bg-green-100 text-green-800 rounded-full px-4 py-2 border border-green-200">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="font-semibold">{{ todoStore.completedTodosCount }} 个任务已完成</span>
            </div>
          </div>
          
          <button
            v-if="todoStore.completedTodosCount > 0"
            @click="clearCompleted"
            class="px-6 py-3 btn-danger text-white rounded-xl font-semibold text-sm flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            清除已完成
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TodoItem from './TodoItem.vue'
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()
const newTodoText = ref('')

const filterOptions = [
  { value: 'all', label: '全部任务' },
  { value: 'active', label: '待完成' },
  { value: 'completed', label: '已完成' }
]

const handleAddTodo = () => {
  if (newTodoText.value.trim()) {
    todoStore.addTodo(newTodoText.value)
    newTodoText.value = ''
  }
}

const handleToggle = (id) => {
  todoStore.toggleTodo(id)
}

const handleRemove = (id) => {
  todoStore.removeTodo(id)
}

const handleUpdate = (id, text) => {
  todoStore.updateTodoText(id, text)
}

const setFilter = (newFilter) => {
  todoStore.setFilter(newFilter)
}

const clearCompleted = () => {
  todoStore.clearCompleted()
}

const getFilterIcon = (filter) => {
  const icons = {
    'all': '📋',
    'active': '⏳',
    'completed': '✅'
  }
  return icons[filter] || '📋'
}

const getEmptyIcon = () => {
  const icons = {
    'all': '📝',
    'active': '🎯',
    'completed': '🎉'
  }
  return icons[todoStore.filter] || '📝'
}

const getEmptyMessage = () => {
  switch (todoStore.filter) {
    case 'active':
      return '太棒了！没有待办任务'
    case 'completed':
      return '还没有完成任务'
    default:
      return '开始你的第一个任务吧'
  }
}

const getEmptySubMessage = () => {
  switch (todoStore.filter) {
    case 'active':
      return '所有任务都已完成，休息一下或者添加新的目标吧！'
    case 'completed':
      return '完成一些任务后，它们就会出现在这里'
    default:
      return '添加一个新任务来开始你的高效之旅'
  }
}
</script>

<style scoped>
.todo-list-enter-active,
.todo-list-leave-active {
  transition: all 0.3s ease;
}

.todo-list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.todo-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.todo-list-move {
  transition: transform 0.3s ease;
}
</style>