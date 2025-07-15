import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const filter = ref<'all' | 'active' | 'completed'>('all')

  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(todo => !todo.completed)
      case 'completed':
        return todos.value.filter(todo => todo.completed)
      default:
        return todos.value
    }
  })

  const activeTodosCount = computed(() => {
    return todos.value.filter(todo => !todo.completed).length
  })

  const completedTodosCount = computed(() => {
    return todos.value.filter(todo => todo.completed).length
  })

  const totalTodosCount = computed(() => {
    return todos.value.length
  })

  function addTodo(text: string) {
    if (!text.trim()) return
    
    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date()
    }
    
    todos.value.unshift(newTodo)
  }

  function toggleTodo(id: number) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  function removeTodo(id: number) {
    const index = todos.value.findIndex(t => t.id === id)
    if (index > -1) {
      todos.value.splice(index, 1)
    }
  }

  function updateTodoText(id: number, newText: string) {
    const todo = todos.value.find(t => t.id === id)
    if (todo && newText.trim()) {
      todo.text = newText.trim()
    }
  }

  function clearCompleted() {
    todos.value = todos.value.filter(todo => !todo.completed)
  }

  function setFilter(newFilter: 'all' | 'active' | 'completed') {
    filter.value = newFilter
  }

  return {
    todos,
    filter,
    filteredTodos,
    activeTodosCount,
    completedTodosCount,
    totalTodosCount,
    addTodo,
    toggleTodo,
    removeTodo,
    updateTodoText,
    clearCompleted,
    setFilter
  }
})