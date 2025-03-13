<script setup lang="ts">
import { computed } from '#imports'
import { usePosts } from '~/composables/usePosts'

const route = useRoute()
const { posts } = usePosts()

const tags = computed(() => {
  const allTags = new Set(posts.value.flatMap(post => post.tags || []))
  return Array.from(allTags)
})

// 验证标签是否存在
const tag = computed(() => {
  const tagName = route.params.tag as string
  return tags.value.includes(tagName) ? tagName : null
})

// 如果标签不存在，重定向到首页
if (!tag.value) {
  navigateTo('/')
}
</script>

<template>
  <main v-if="tag" class="max-w-7xl mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
        标签：{{ tag }}
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        查看包含该标签的所有文章
      </p>
    </div>

    <PostList :tag="tag" />
  </main>
</template> 
