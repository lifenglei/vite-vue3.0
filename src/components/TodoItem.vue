<template>
  <div 
    class="group flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
    :class="{ 'bg-gray-50': todo.completed }"
  >
    <div class="flex items-center flex-1 min-w-0">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="handleToggle"
        class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
      />
      
      <div class="flex-1 ml-4 min-w-0">
        <div v-if="isEditing" class="flex items-center">
          <input
            ref="editInput"
            v-model="editText"
            @keyup.enter="handleSaveEdit"
            @keyup.escape="handleCancelEdit"
            @blur="handleSaveEdit"
            class="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="编辑待办事项..."
          />
          <button
            @click="handleSaveEdit"
            class="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            保存
          </button>
          <button
            @click="handleCancelEdit"
            class="ml-1 px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            取消
          </button>
        </div>
        
        <span 
          v-else
          @dblclick="handleStartEdit"
          class="text-gray-900 cursor-pointer select-none"
          :class="{ 'line-through text-gray-500': todo.completed }"
        >
          {{ todo.text }}
        </span>
      </div>
    </div>
    
    <div class="flex items-center ml-4 space-x-2">
      <button
        @click="handleStartEdit"
        class="p-1 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
        title="编辑"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      
      <button
        @click="handleRemove"
        class="p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
        title="删除"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { Todo } from '../stores/todo'

interface Props {
  todo: Todo
}

interface Emits {
  (e: 'toggle', id: number): void
  (e: 'remove', id: number): void
  (e: 'update', id: number, text: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isEditing = ref(false)
const editText = ref('')
const editInput = ref<HTMLInputElement>()

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
</script>