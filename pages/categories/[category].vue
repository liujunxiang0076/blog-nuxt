<script setup lang="ts">
import { computed } from '#imports'
import { usePosts } from '~/composables/usePosts'

const route = useRoute()
const { posts } = usePosts()

const categories = computed(() => {
  const uniqueCategories = new Set(posts.value.map(post => post.category).filter((cat): cat is string => !!cat))
  return Array.from(uniqueCategories)
})

// 验证分类是否存在
const category = computed(() => {
  const categoryName = route.params.category as string
  return categories.value.includes(categoryName) ? categoryName : null
})

// 如果分类不存在，重定向到首页
if (!category.value) {
  navigateTo('/')
}
</script>

<template>
  <main v-if="category" class="max-w-7xl mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
        分类：{{ category }}
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        查看该分类下的所有文章
      </p>
    </div>

    <PostList :category="category" />
  </main>
</template> 
