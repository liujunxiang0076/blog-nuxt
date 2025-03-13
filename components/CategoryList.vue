<script setup lang="ts">
import { usePosts } from '~/composables/usePosts'
import { computed } from 'vue'

const { posts, getPostsByCategory } = usePosts()

const categories = computed(() => {
  const uniqueCategories = new Set(posts.value.map(post => post.category).filter((cat): cat is string => !!cat))
  return Array.from(uniqueCategories)
})
</script>

<template>
  <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">文章分类</h3>
    <ul class="space-y-2">
      <li v-for="category in categories" :key="category">
        <NuxtLink
          :to="`/categories/${category}`"
          class="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <span class="text-gray-700 dark:text-gray-300">{{ category }}</span>
          <span class="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300">
            {{ getPostsByCategory(category).length }}
          </span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template> 
