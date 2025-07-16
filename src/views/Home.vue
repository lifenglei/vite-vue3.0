<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
    </div>
    
    <div class="relative container mx-auto px-4 py-8">
      <!-- 头部标题区域 -->
      <div class="text-center mb-12 animate-fade-in-up">
        <div class="mb-6">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full backdrop-blur-lg mb-6">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
          </div>
        </div>
        
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          <span class="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            TodoMaster
          </span>
        </h1>
        
        <p class="text-xl md:text-2xl text-white/80 mb-2 font-light">
          让每一个任务都变得优雅
        </p>
        
        <p class="text-lg text-white/60 max-w-2xl mx-auto">
          使用 Vue 3 + TypeScript + Tailwind CSS 打造的现代化待办事项管理应用
        </p>
        
        <!-- 装饰性元素 -->
        <div class="flex justify-center mt-8 space-x-4">
          <div class="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
          <div class="w-2 h-2 bg-white/60 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
          <div class="w-2 h-2 bg-white/40 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
        </div>
      </div>
      
      <!-- 统计卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in-up delay-200">
        <div class="glass-effect rounded-2xl p-6 text-center">
          <div class="text-3xl font-bold text-gray-800 mb-2">{{ todoStore.totalTodosCount }}</div>
          <div class="text-gray-600 font-medium">总任务数</div>
        </div>
        <div class="glass-effect rounded-2xl p-6 text-center">
          <div class="text-3xl font-bold text-blue-600 mb-2">{{ todoStore.activeTodosCount }}</div>
          <div class="text-gray-600 font-medium">待完成</div>
        </div>
        <div class="glass-effect rounded-2xl p-6 text-center">
          <div class="text-3xl font-bold text-green-600 mb-2">{{ todoStore.completedTodosCount }}</div>
          <div class="text-gray-600 font-medium">已完成</div>
        </div>
      </div>
      
      <!-- 待办事项组件 -->
      <div class="animate-fade-in-up delay-500">
        <TodoList />
      </div>
    </div>
  </div>
</template>

<script setup>
import TodoList from '../components/TodoList.vue'
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()
</script> 