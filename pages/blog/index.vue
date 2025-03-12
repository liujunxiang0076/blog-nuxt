<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto text-center mb-12">
      <h1 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">博客文章</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">探索我们的文章，了解前端开发的最新趋势和技术。</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="post in posts" :key="post.id" class="card overflow-hidden">
        <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover">
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{{ post.title }}</h2>
          <p class="text-gray-500 dark:text-gray-400 mb-4">{{ post.date }}</p>
          <p class="mb-4 text-gray-700 dark:text-gray-300">{{ post.summary }}</p>
          <NuxtLink :to="`/blog/${post.id}`" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
            阅读更多 &rarr;
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <div class="mt-12 text-center">
      <NuxtLink to="/" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
        &larr; 返回首页
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: '博客文章'
})

// 模拟博客文章数据
const posts = ref([
  {
    id: 1,
    title: 'Nuxt 3 入门指南',
    date: '2023-03-10',
    image: 'https://picsum.photos/seed/nuxt1/800/600',
    summary: '学习如何使用 Nuxt 3 构建现代化的 Vue.js 应用程序。'
  },
  {
    id: 2,
    title: 'Vue 3 组合式 API 详解',
    date: '2023-03-05',
    image: 'https://picsum.photos/seed/vue2/800/600',
    summary: '深入了解 Vue 3 的组合式 API 及其优势。'
  },
  {
    id: 3,
    title: '使用 Tailwind CSS 构建响应式界面',
    date: '2023-02-28',
    image: 'https://picsum.photos/seed/tailwind3/800/600',
    summary: '探索如何使用 Tailwind CSS 快速构建美观的响应式界面。'
  },
  {
    id: 4,
    title: 'JavaScript 异步编程最佳实践',
    date: '2023-02-20',
    image: 'https://picsum.photos/seed/js4/800/600',
    summary: '学习 JavaScript 中处理异步操作的最佳实践和模式。'
  },
  {
    id: 5,
    title: 'TypeScript 类型系统进阶',
    date: '2023-02-15',
    image: 'https://picsum.photos/seed/ts5/800/600',
    summary: '深入探讨 TypeScript 的高级类型特性和类型编程。'
  },
  {
    id: 6,
    title: 'Web 性能优化技巧',
    date: '2023-02-10',
    image: 'https://picsum.photos/seed/perf6/800/600',
    summary: '学习提高网站性能的实用技巧和最佳实践。'
  }
])
</script> 
