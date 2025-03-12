<script setup lang="ts">
import { marked } from 'marked';
import type { Post } from '~/types';

const route = useRoute();
const slug = Array.isArray(route.params.slug) 
  ? route.params.slug.join('/') 
  : route.params.slug;

const { posts } = usePosts();
const post = computed(() => posts.value.find(p => p.slug === slug));

// 渲染Markdown内容
const renderedContent = computed(() => {
  if (!post.value?.content) return '';
  return marked(post.value.content);
});

// 提取标题生成目录
const headers = computed(() => {
  if (!post.value?.content) return [];
  const lines = post.value.content.split('\n');
  return lines
    .filter(line => line.startsWith('#'))
    .map(line => {
      const level = line.match(/^#+/)[0].length;
      const title = line.replace(/^#+\s+/, '');
      return { level, title };
    });
});

// 上一篇/下一篇文章
const currentIndex = computed(() => posts.value.findIndex(p => p.slug === slug));
const prevPost = computed(() => currentIndex.value > 0 ? posts.value[currentIndex.value - 1] : null);
const nextPost = computed(() => currentIndex.value < posts.value.length - 1 ? posts.value[currentIndex.value + 1] : null);

// 格式化日期
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 获取所有文章用于导航和相关文章推荐
const { data: postsAll } = await useAsyncData('posts', () =>
  queryContent('posts').sort({ date: -1 }).find()
)

// 相关文章推荐算法
const relatedPosts = computed(() => {
  if (!post.value || !postsAll.value) return []
  
  const currentTags = new Set(post.value.tags || [])
  const currentCategory = post.value.category

  return postsAll.value
    .filter(p => p._path !== post.value._path) // 排除当前文章
    .map(p => {
      let score = 0
      
      // 根据标签计算相关度
      const commonTags = (p.tags || []).filter(tag => currentTags.has(tag))
      score += commonTags.length * 2 // 每个共同标签加2分
      
      // 相同分类加分
      if (p.category === currentCategory) {
        score += 3 // 相同分类加3分
      }
      
      return { ...p, score }
    })
    .filter(p => p.score > 0) // 只保留有相关度的文章
    .sort((a, b) => b.score - a.score) // 按相关度排序
    .slice(0, 5) // 只取前5篇
})

// 如果文章不存在，重定向到首页
if (!post.value) {
  navigateTo('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="py-10">
        <!-- 返回按钮 -->
        <NuxtLink to="/" class="inline-flex items-center mb-8 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回首页
        </NuxtLink>

        <div class="flex gap-8">
          <!-- 主要内容区 -->
          <article class="flex-1 prose prose-lg dark:prose-invert max-w-4xl prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary-600 dark:prose-a:text-primary-400 hover:prose-a:text-primary-500 prose-img:rounded-lg prose-pre:bg-gray-800 dark:prose-pre:bg-gray-950">
            <h1 class="mb-4 text-4xl font-bold tracking-tight">{{ post?.title }}</h1>
            
            <!-- 文章元信息 -->
            <div class="flex items-center gap-4 mb-8 text-sm text-gray-600 dark:text-gray-400">
              <time :datetime="post?.date">{{ formatDate(post?.date) }}</time>
              <span>·</span>
              <ReadingTime :content="post?.content" />
            </div>

            <!-- 文章内容 -->
            <div v-html="renderedContent" class="mt-8"></div>
          </article>

          <!-- 侧边栏目录 -->
          <aside class="hidden lg:block w-64 shrink-0">
            <div class="sticky top-8">
              <h2 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">目录</h2>
              <TableOfContents 
                :headers="headers"
                class="max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
              />
            </div>
          </aside>
        </div>

        <!-- 上一篇/下一篇导航 -->
        <nav class="mt-16 border-t border-gray-200 dark:border-gray-800 pt-8">
          <div class="grid grid-cols-2 gap-8">
            <div v-if="prevPost" class="group">
              <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">上一篇</div>
              <NuxtLink :to="`/posts/${prevPost.slug}`" class="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                {{ prevPost.title }}
              </NuxtLink>
            </div>
            <div v-if="nextPost" class="group text-right">
              <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">下一篇</div>
              <NuxtLink :to="`/posts/${nextPost.slug}`" class="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                {{ nextPost.title }}
              </NuxtLink>
            </div>
          </div>
        </nav>

        <!-- 相关文章 -->
        <div v-if="relatedPosts.length > 0" class="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">相关文章</h3>
          <ul class="space-y-4">
            <li v-for="relatedPost in relatedPosts" :key="relatedPost._path">
              <NuxtLink
                :to="relatedPost._path"
                class="block hover:text-primary-600 dark:hover:text-primary-400"
              >
                <h4 class="font-medium">{{ relatedPost.title }}</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ relatedPost.summary }}</p>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* 自定义滚动条样式 */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #E5E7EB;
  border-radius: 2px;
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #374151;
}

/* 优化代码块样式 */
.prose pre {
  background-color: #1a1a1a !important;
  border-radius: 0.5rem;
  padding: 1.25rem !important;
  margin: 1.5rem 0 !important;
}

.prose code {
  color: #e2e8f0 !important;
  background-color: #2d3748;
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.prose pre code {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  color: inherit;
}

/* 优化引用块样式 */
.prose blockquote {
  border-left-color: #6366f1;
  background-color: #f8fafc;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
}

.dark .prose blockquote {
  background-color: #1e293b;
  border-left-color: #818cf8;
}

/* 优化链接样式 */
.prose a {
  text-decoration: none;
  border-bottom: 1px dashed currentColor;
  transition: all 0.2s ease;
}

.prose a:hover {
  border-bottom-style: solid;
}
</style> 
