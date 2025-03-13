<script setup lang="ts">
import { usePosts } from '~/composables/usePosts'
import { computed } from 'vue'

const { posts } = usePosts()

const tags = computed(() => {
  const allTags = new Set(posts.value.flatMap(post => post.tags || []))
  return Array.from(allTags)
})
</script>

<template>
  <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">标签云</h3>
    <div class="flex flex-wrap gap-2">
      <NuxtLink
        v-for="tag in tags"
        :key="tag"
        :to="`/tags/${tag}`"
        class="px-3 py-1 text-sm rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 transition-colors duration-200"
      >
        {{ tag }}
      </NuxtLink>
    </div>
  </div>
</template> 
