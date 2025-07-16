<template>
  <div class="group relative">
    <div 
      class="flex items-center p-6 bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-lg hover:from-white/80 hover:to-white/60 transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg"
      :class="{ 'opacity-60': todo.completed }"
    >
      <!-- 完成状态指示器 -->
      <div class="flex items-center mr-4">
        <div class="relative">
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="handleToggle"
            class="sr-only"
          />
          <div 
            @click="handleToggle"
            class="w-6 h-6 border-2 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center"
            :class="[
              todo.completed 
                ? 'bg-gradient-to-r from-green-400 to-green-600 border-green-500 scale-110' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            ]"
          >
            <svg 
              v-if="todo.completed"
              class="w-3 h-3 text-white transform scale-100 transition-transform duration-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <!-- 内容区域 -->
      <div class="flex-1 min-w-0">
        <div v-if="isEditing" class="flex items-center gap-3">
          <input
            ref="editInput"
            v-model="editText"
            @keyup.enter="handleSaveEdit"
            @keyup.escape="handleCancelEdit"
            @blur="handleSaveEdit"
            class="flex-1 px-4 py-3 bg-white/80 backdrop-blur-lg border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white text-gray-800 font-medium transition-all duration-200 custom-input"
            placeholder="编辑任务内容..."
          />
          <button
            @click="handleSaveEdit"
            class="px-4 py-2 btn-secondary text-white rounded-lg text-sm font-semibold"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </button>
          <button
            @click="handleCancelEdit"
            class="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div 
          v-else
          @dblclick="handleStartEdit"
          class="cursor-pointer select-none transition-all duration-200"
        >
          <div class="flex items-center">
            <span 
              class="text-lg font-medium transition-all duration-300"
              :class="[
                todo.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-800 group-hover:text-gray-900'
              ]"
            >
              {{ todo.text }}
            </span>
            
            <!-- 优先级标识 -->
            <div v-if="!todo.completed" class="ml-3">
              <div class="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60"></div>
            </div>
          </div>
          
          <!-- 创建时间 -->
          <div class="mt-1 text-xs text-gray-500 font-medium">
            <svg class="inline w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            创建于 {{ formatDate(todo.createdAt) }}
          </div>
        </div>
      </div>
      
      <!-- 操作按钮区域 -->
      <div class="flex items-center ml-4 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <!-- 编辑按钮 -->
        <button
          @click="handleStartEdit"
          class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:scale-110"
          title="编辑任务"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        
        <!-- 删除按钮 -->
        <button
          @click="handleRemove"
          class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 transform hover:scale-110"
          title="删除任务"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- 完成任务的庆祝效果 -->
    <div 
      v-if="todo.completed"
      class="absolute inset-0 pointer-events-none"
    >
      <div class="absolute top-4 right-4">
        <div class="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center animate-pulse">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle', 'remove', 'update'])

const isEditing = ref(false)
const editText = ref('')
const editInput = ref()

const handleToggle = () => {
  emit('toggle', props.todo.id)
}

const handleRemove = () => {
  emit('remove', props.todo.id)
}

const handleStartEdit = async () => {
  isEditing.value = true
  editText.value = props.todo.text
  await nextTick()
  editInput.value?.focus()
  editInput.value?.select()
}

const handleSaveEdit = () => {
  if (editText.value.trim() && editText.value !== props.todo.text) {
    emit('update', props.todo.id, editText.value)
  }
  isEditing.value = false
}

const handleCancelEdit = () => {
  isEditing.value = false
  editText.value = ''
}

const formatDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  
  const now = new Date()
  const diff = now - date
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) {
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours === 0) {
      const minutes = Math.floor(diff / (1000 * 60))
      return minutes <= 1 ? '刚刚' : `${minutes}分钟前`
    }
    return `${hours}小时前`
  } else if (days === 1) {
    return '昨天'
  } else if (days < 7) {
    return `${days}天前`
  } else {
    return date.toLocaleDateString('zh-CN', { 
      month: 'numeric', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    })
  }
}
</script>