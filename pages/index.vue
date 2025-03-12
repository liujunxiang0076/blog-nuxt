<script setup lang="ts">
definePageMeta({
  title: '首页'
})
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 py-8">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- 主要内容区域 -->
      <div class="lg:w-3/4">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
            最新文章
          </h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            探索最新的技术文章和见解
          </p>
        </div>

        <PostList />
      </div>

      <!-- 侧边栏 -->
      <aside class="lg:w-1/4 space-y-6">
        <!-- 搜索框 -->
        <div class="sticky top-24">
          <SearchBar />
          
          <!-- 分类列表 -->
          <div class="mt-6">
            <CategoryList />
          </div>

          <!-- 标签云 -->
          <div class="mt-6">
            <TagCloud />
          </div>
        </div>
      </aside>
    </div>
  </main>
</template> 
