<script setup lang="ts">
import { computed } from 'vue'
import { usePosts } from '~/composables/usePosts'

const { posts, getPostsByCategory, getPostsByTag } = usePosts()

const props = defineProps<{
  category?: string
  tag?: string
}>()

const filteredPosts = computed(() => {
  if (props.category) {
    return getPostsByCategory(props.category)
  }
  if (props.tag) {
    return getPostsByTag(props.tag)
  }
  return posts.value
})
</script>

<template>
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <article
      v-for="post in filteredPosts"
      :key="post.slug"
      class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <NuxtLink :to="`/posts/${post.slug}`">
        <img
          :src="post.image"
          :alt="post.title"
          class="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
        <div class="p-6">
          <div class="flex items-center space-x-2 mb-2">
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ post.date }}</span>
            <span class="text-gray-300 dark:text-gray-600">•</span>
            <span class="text-sm text-primary-600 dark:text-primary-400">{{ post.category }}</span>
          </div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
            {{ post.title }}
          </h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {{ post.summary }}
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </NuxtLink>
    </article>
  </div>
</template> 
