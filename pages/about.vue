<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">关于我们</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">了解我们的故事、使命和团队</p>
      </div>
      
      <div class="card p-8 mb-12">
        <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">我们的故事</h2>
        <div class="prose dark:prose-invert">
          <p class="mb-4 text-gray-700 dark:text-gray-300">
            这是一个使用 Nuxt 3 构建的博客网站。我们致力于分享有关前端开发、Vue.js 和 Nuxt 的知识和经验。
          </p>
          <p class="mb-4 text-gray-700 dark:text-gray-300">
            Nuxt 3 是一个强大的 Vue.js 框架，它提供了许多功能，如自动路由、服务器端渲染、API 路由等。我们希望通过这个博客，帮助更多的开发者了解和使用 Nuxt 3。
          </p>
          <p class="mb-4 text-gray-700 dark:text-gray-300">
            我们的团队由一群热爱前端开发的工程师组成，他们拥有丰富的实战经验和深厚的技术功底。我们相信，通过分享知识和经验，可以帮助更多的人成长和进步。
          </p>
        </div>
      </div>
      
      <div class="card p-8 mb-12">
        <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">我们的技术栈</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="bg-blue-100 dark:bg-blue-900 rounded-full p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center">
              <svg class="h-8 w-8 text-blue-500 dark:text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22.4l-9.1-5.3v-10.5l9.1-5.3 9.1 5.3v10.5l-9.1 5.3zm0-19.1l-7.1 4.1v8.2l7.1 4.1 7.1-4.1v-8.2l-7.1-4.1z"/>
                <path d="M12 16.1l-4.5-2.6v-5.2l4.5-2.6 4.5 2.6v5.2l-4.5 2.6zm0-8.8l-2.5 1.5v3l2.5 1.5 2.5-1.5v-3l-2.5-1.5z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white">Vue.js</h3>
          </div>
          <div class="text-center">
            <div class="bg-green-100 dark:bg-green-900 rounded-full p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center">
              <svg class="h-8 w-8 text-green-500 dark:text-green-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l9.3 3.3v13.4l-9.3 3.3-9.3-3.3v-13.4l9.3-3.3zm0 2.2l-7.3 2.6v11.6l7.3 2.6 7.3-2.6v-11.6l-7.3-2.6z"/>
                <path d="M12 5.8l6 2.1v8.2l-6 2.1-6-2.1v-8.2l6-2.1zm0 1.8l-4 1.4v5.6l4 1.4 4-1.4v-5.6l-4-1.4z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white">Nuxt</h3>
          </div>
          <div class="text-center">
            <div class="bg-purple-100 dark:bg-purple-900 rounded-full p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center">
              <svg class="h-8 w-8 text-purple-500 dark:text-purple-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/>
                <path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white">TypeScript</h3>
          </div>
          <div class="text-center">
            <div class="bg-teal-100 dark:bg-teal-900 rounded-full p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center">
              <svg class="h-8 w-8 text-teal-500 dark:text-teal-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l10 5v10l-10 5-10-5v-10l10-5zm0 2.2l-7.3 3.7v7.4l7.3 3.7 7.3-3.7v-7.4l-7.3-3.7z"/>
                <path d="M12 5.8l6 3v6.4l-6 3-6-3v-6.4l6-3zm0 1.8l-4 2v4.8l4 2 4-2v-4.8l-4-2z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white">Tailwind CSS</h3>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-8">
        <NuxtLink to="/" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
          &larr; 返回首页
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: '关于我们'
})
</script> 
