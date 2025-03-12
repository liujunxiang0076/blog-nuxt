<script setup lang="ts">
import { renderMarkdown } from '~/utils/markdown'
import type { Post } from '~/types';

const route = useRoute();
const slug = Array.isArray(route.params.slug) 
  ? route.params.slug.join('/') 
  : route.params.slug;

const { posts, getPostBySlug } = usePosts();
const post = computed(() => getPostBySlug(slug));

// 渲染Markdown内容
const renderedContent = ref('')

watchEffect(async () => {
  if (post.value?.content) {
    renderedContent.value = await renderMarkdown(post.value.content)
  } else {
    renderedContent.value = ''
  }
})

// 提取标题生成目录
const headers = computed(() => {
  if (!post.value?.content) return [];
  const lines = post.value.content.split('\n');
  return lines
    .filter(line => line.startsWith('#'))
    .map(line => {
      const level = line.match(/^#+/)?.[0]?.length ?? 1;
      const title = line.replace(/^#+\s+/, '');
      return { level, title };
    });
});

// 上一篇/下一篇文章
const currentIndex = computed(() => posts.value.findIndex(p => p.slug === slug));
const prevPost = computed(() => currentIndex.value > 0 ? posts.value[currentIndex.value - 1] : null);
const nextPost = computed(() => currentIndex.value < posts.value.length - 1 ? posts.value[currentIndex.value + 1] : null);

// 格式化日期
const formatDate = (date?: string) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 获取所有文章用于导航和相关文章推荐
const postsAll = posts;

// 相关文章推荐算法
const relatedPosts = computed(() => {
  if (!post.value || !postsAll.value) return []
  
  const currentTags = new Set(post.value.tags || [])
  const currentCategory = post.value.category

  return postsAll.value
    .filter(p => p.slug !== post.value?.slug) // 排除当前文章
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

// 添加复制代码功能
onMounted(() => {
  const copyButtons = document.querySelectorAll('.copy-button')
  copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const code = decodeURIComponent((button as HTMLElement).dataset.code || '')
      await navigator.clipboard.writeText(code)
      
      const originalText = button.innerHTML
      button.innerHTML = `
        已复制!
        &lt;svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"&gt;
          &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /&gt;
        &lt;/svg&gt;
      `
      button.classList.add('text-green-500')
      
      setTimeout(() => {
        button.innerHTML = originalText
        button.classList.remove('text-green-500')
      }, 2000)
    })
  })
})
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
        <div v-if="relatedPosts.length > 0" class="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">推荐阅读</h3>
          <div class="grid gap-6 md:grid-cols-2">
            <article v-for="relatedPost in relatedPosts" :key="relatedPost.slug" class="group">
              <NuxtLink
                :to="`/posts/${relatedPost.slug}`"
                class="block space-y-3"
              >
                <div class="relative h-48 overflow-hidden rounded-lg">
                  <img
                    v-if="relatedPost.image"
                    :src="relatedPost.image"
                    :alt="relatedPost.title"
                    class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div v-else class="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span class="text-gray-400 dark:text-gray-500">无图片</span>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <time :datetime="relatedPost.date">{{ formatDate(relatedPost.date) }}</time>
                    <span v-if="relatedPost.category" class="px-2 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                      {{ relatedPost.category }}
                    </span>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {{ relatedPost.title }}
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {{ relatedPost.summary }}
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="tag in relatedPost.tags" 
                      :key="tag"
                      class="text-xs text-gray-500 dark:text-gray-400"
                    >
                      #{{ tag }}
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* VitePress 风格样式 */
.prose {
  --vp-c-text-1: #213547;
  --vp-c-text-2: #476582;
  --vp-c-bg-soft: #f9f9f9;
  --vp-c-divider: #e2e2e2;
  --vp-code-block-bg: #292d3e;
  --vp-code-line-highlight-bg: rgba(0, 0, 0, 0.2);
  --vp-code-line-number-color: #888;
  --vp-code-copy-code-hover-bg: rgba(255, 255, 255, 0.05);
  --vp-code-copy-code-active-text: #fff;
}

.dark .prose {
  --vp-c-text-1: #ffffff;
  --vp-c-text-2: #a8b1bf;
  --vp-c-bg-soft: #161618;
  --vp-c-divider: #2e2e32;
}

.prose {
  color: var(--vp-c-text-1);
  max-width: none;
}

/* 标题样式 */
.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  color: var(--vp-c-text-1);
  font-weight: 600;
  line-height: 1.25;
  margin-top: 2.5em;
  margin-bottom: 1.5em;
  position: relative;
}

.prose h1 {
  font-size: 2.5em;
  margin-top: 0;
  padding-top: 0;
}

.prose h2 {
  font-size: 1.875em;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5em;
  margin-top: 2em;
}

.prose h3 {
  font-size: 1.5em;
}

/* 代码块样式 */
.prose .code-block {
  background-color: var(--vp-code-block-bg);
  border-radius: 8px;
  margin: 1.5em 0;
  position: relative;
  overflow-x: auto;
}

.prose .code-block pre {
  margin: 0;
  padding: 1em 0;
}

.prose .code-block code {
  display: block;
  font-family: 'Fira Code', monospace;
  font-size: 0.875em;
  line-height: 1.7;
  padding: 0 1.5em;
  color: #A6ACCD;
  background: transparent;
}

/* 行内代码样式 */
.prose :not(pre) > code {
  font-family: 'Fira Code', monospace;
  font-size: 0.875em;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  padding: 0.2em 0.4em;
  border-radius: 4px;
  word-break: break-word;
}

/* 引用块样式 */
.prose blockquote {
  border-left: 4px solid #42b883;
  padding: 1em 1.2em;
  background-color: var(--vp-c-bg-soft);
  border-radius: 0 4px 4px 0;
  margin: 1.5em 0;
}

.prose blockquote p {
  margin: 0;
  font-size: 1em;
  color: var(--vp-c-text-2);
}

/* 列表样式 */
.prose ul,
.prose ol {
  padding-left: 1.5em;
  margin: 1.5em 0;
}

.prose li {
  margin: 0.5em 0;
}

.prose ul > li::before {
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--vp-c-text-2);
  transform: translateX(-1em) translateY(0.75em);
}

/* 表格样式 */
.prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5em 0;
}

.prose th,
.prose td {
  border: 1px solid var(--vp-c-divider);
  padding: 0.75em 1em;
}

.prose th {
  background-color: var(--vp-c-bg-soft);
  font-weight: 600;
}

/* 链接样式 */
.prose a {
  color: #42b883;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.25s;
}

.prose a:hover {
  color: #35495e;
}

.dark .prose a:hover {
  color: #3eaf7c;
}

/* 图片样式 */
.prose img {
  border-radius: 8px;
  margin: 1.5em 0;
}

/* 分割线样式 */
.prose hr {
  border: none;
  border-top: 1px solid var(--vp-c-divider);
  margin: 2em 0;
}

/* 代码块顶部栏 */
.prose .code-block .flex {
  background-color: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.prose .code-block .copy-button {
  opacity: 0;
  transition: opacity 0.25s;
}

.prose .code-block:hover .copy-button {
  opacity: 1;
}

/* 自定义滚动条 */
.prose pre::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.prose pre::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.prose pre::-webkit-scrollbar-track {
  background: transparent;
}

/* 移除 highlight.js 样式 */
@import 'prismjs/themes/prism-tomorrow.css';
</style> 
