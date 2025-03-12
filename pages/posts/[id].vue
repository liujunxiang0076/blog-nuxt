<script setup lang="ts">
import { ref, computed } from 'vue'
import { marked } from 'marked'
import type { Post } from '~/types'
import { usePosts } from '~/composables/usePosts'

const route = useRoute()
const { getPost, getRelatedPosts } = usePosts()

const post = ref<Post | undefined>(getPost(route.params.id as string))
const relatedPosts = computed(() => post.value ? getRelatedPosts(post.value) : [])

// 渲染 Markdown 内容
const renderedContent = computed(() => {
  if (!post.value) return ''
  return marked(post.value.content)
})

interface HeadingToken {
  type: 'heading';
  text: string;
  depth: number;
}

// 生成目录
const toc = computed(() => {
  if (!post.value) return { headers: [] }
  
  const tokens = marked.lexer(post.value.content)
  const headers = tokens
    .filter(token => token.type === 'heading')
    .map(token => ({
      id: (token as HeadingToken).text.toLowerCase().replace(/\s+/g, '-'),
      title: (token as HeadingToken).text,
      level: (token as HeadingToken).depth
    }))
  
  return { headers }
})

// 格式化日期
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 如果文章不存在，重定向到首页
if (!post.value) {
  navigateTo('/')
}
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 py-8">
    <NuxtLink
      to="/"
      class="inline-flex items-center mb-6 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
    >
      <svg
        class="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      返回文章列表
    </NuxtLink>

    <div v-if="post" class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- 文章内容 -->
      <article class="lg:col-span-8 prose dark:prose-invert lg:prose-xl mx-auto">
        <img
          :src="post.image"
          :alt="post.title"
          class="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg mb-8"
        />
        
        <div class="flex items-center space-x-4 mb-8">
          <span class="text-gray-500 dark:text-gray-400">{{ formatDate(post.date) }}</span>
          <ReadingTime :content="post.content" />
          <div class="flex items-center space-x-2">
            <NuxtLink
              v-for="tag in post.tags"
              :key="tag"
              :to="`/tags/${tag}`"
              class="px-3 py-1 text-sm rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800"
            >
              {{ tag }}
            </NuxtLink>
          </div>
        </div>

        <div v-html="renderedContent" />
      </article>

      <!-- 侧边栏 -->
      <aside class="lg:col-span-4">
        <div class="sticky top-24 space-y-8">
          <!-- 目录导航 -->
          <TableOfContents :headers="toc.headers" />

          <!-- 相关文章 -->
          <div v-if="relatedPosts.length > 0" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">相关文章</h3>
            <ul class="space-y-4">
              <li v-for="relatedPost in relatedPosts" :key="relatedPost.id">
                <NuxtLink
                  :to="`/posts/${relatedPost.id}`"
                  class="block hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <h4 class="font-medium">{{ relatedPost.title }}</h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ relatedPost.summary }}</p>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  </main>
</template> 
