<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="container mx-auto px-4 h-16">
        <div class="flex justify-between items-center h-full">
          <NuxtLink to="/" class="text-xl font-bold text-primary-600 dark:text-primary-400">
            Nuxt Test Project
          </NuxtLink>
          
          <nav class="flex items-center space-x-8">
            <NuxtLink to="/" class="nav-link">首页</NuxtLink>
            <NuxtLink to="/blog" class="nav-link">博客</NuxtLink>
            <NuxtLink to="/about" class="nav-link">关于</NuxtLink>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
    
    <main class="flex-grow">
      <NuxtPage />
    </main>
    
    <footer class="bg-white dark:bg-gray-800 shadow-inner mt-12">
      <div class="container mx-auto py-8 px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">关于我们</h3>
            <p class="text-gray-600 dark:text-gray-400">
              我们致力于分享前端开发、Vue.js 和 Nuxt 的知识和经验。
            </p>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4">快速链接</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/" class="nav-link">首页</NuxtLink></li>
              <li><NuxtLink to="/blog" class="nav-link">博客</NuxtLink></li>
              <li><NuxtLink to="/about" class="nav-link">关于</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4">联系我们</h3>
            <ul class="space-y-2 text-gray-600 dark:text-gray-400">
              <li>邮箱：contact@example.com</li>
              <li>微信：myblog_official</li>
              <li>地址：中国上海市</li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {{ new Date().getFullYear() }} 我的博客. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// 获取当前年份
const currentYear = new Date().getFullYear()
</script>
