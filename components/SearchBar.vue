<template>
  <div class="relative">
    <div class="relative">
      <input
        ref="searchInput"
        v-model="searchQuery"
        type="text"
        placeholder="搜索文章..."
        class="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
        @focus="onFocus"
      />
      <div class="absolute inset-y-0 right-0 flex items-center pr-3">
        <svg
          class="w-5 h-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <!-- 搜索结果下拉框 -->
    <div
      v-if="isDropdownOpen && filteredResults.length > 0"
      class="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-800 max-h-96 overflow-y-auto"
    >
      <ul class="py-2">
        <li
          v-for="result in filteredResults"
          :key="result.slug"
          class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
        >
          <NuxtLink
            :to="`/posts/${result.slug}`"
            class="block"
            @click="onResultClick"
          >
            <h4 class="font-medium text-gray-900 dark:text-gray-100">
              {{ result.title }}
            </h4>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ result.summary }}
            </p>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePosts } from '~/composables/usePosts'
import type { Post } from '~/types'

const searchQuery = ref('')
const isDropdownOpen = ref(false)
const searchInput = ref<HTMLInputElement | null>(null)

const { posts } = usePosts()

const filteredResults = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return []
  
  return (posts.value as Post[])
    .filter(post => {
      const title = post.title.toLowerCase()
      const summary = post.summary?.toLowerCase() || ''
      const content = post.content.toLowerCase()
      return title.includes(query) || 
             summary.includes(query) || 
             content.includes(query)
    })
    .slice(0, 5)
})

const onFocus = () => {
  isDropdownOpen.value = true
}

const onResultClick = () => {
  isDropdownOpen.value = false
  searchQuery.value = ''
}

const handleClickOutside = (event: MouseEvent) => {
  if (searchInput.value && !searchInput.value.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script> 
