<template>
  <div class="container mx-auto px-4 py-12">
    <div v-if="post" class="max-w-3xl mx-auto">
      <img :src="post.image" :alt="post.title" class="w-full h-64 object-cover rounded-lg shadow-md mb-8">
      <h1 class="text-4xl font-bold mb-3 text-gray-900 dark:text-white">{{ post.title }}</h1>
      <p class="text-gray-500 dark:text-gray-400 mb-8">{{ post.date }}</p>
      
      <div class="prose dark:prose-invert mb-10 text-gray-700 dark:text-gray-300">
        <p class="mb-4 whitespace-pre-line">{{ post.content }}</p>
      </div>
      
      <div class="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
        <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">分享这篇文章</h3>
        <div class="flex space-x-4">
          <a href="#" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
            <span class="sr-only">分享到微信</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.58 14.99c-0.5 0-0.9-0.4-0.9-0.9s0.4-0.9 0.9-0.9 0.9 0.4 0.9 0.9-0.4 0.9-0.9 0.9z M15.42 14.99c-0.5 0-0.9-0.4-0.9-0.9s0.4-0.9 0.9-0.9 0.9 0.4 0.9 0.9-0.4 0.9-0.9 0.9z M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z M12 20c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8s8 3.59 8 8c0 4.41-3.59 8-8 8z" />
            </svg>
          </a>
          <a href="#" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
            <span class="sr-only">分享到微博</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.23 5.924c-0.736 0.326-1.527 0.547-2.357 0.646 0.847-0.508 1.498-1.312 1.804-2.27-0.793 0.47-1.671 0.812-2.606 0.996-0.748-0.797-1.816-1.296-2.997-1.296-2.269 0-4.108 1.839-4.108 4.108 0 0.322 0.036 0.635 0.106 0.935-3.415-0.172-6.442-1.807-8.468-4.288-0.354 0.607-0.556 1.312-0.556 2.064 0 1.424 0.724 2.679 1.825 3.415-0.673-0.021-1.305-0.206-1.859-0.513v0.052c0 1.988 1.415 3.647 3.292 4.023-0.344 0.094-0.707 0.144-1.081 0.144-0.264 0-0.521-0.026-0.772-0.074 0.522 1.63 2.038 2.816 3.833 2.85-1.404 1.1-3.174 1.756-5.096 1.756-0.331 0-0.658-0.019-0.979-0.057 1.816 1.164 3.973 1.843 6.29 1.843 7.547 0 11.675-6.252 11.675-11.675 0-0.178-0.004-0.355-0.012-0.531 0.802-0.578 1.498-1.301 2.049-2.124z" />
            </svg>
          </a>
        </div>
      </div>
      
      <div class="flex space-x-4 mt-8">
        <NuxtLink to="/blog" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
          &larr; 返回博客列表
        </NuxtLink>
        <NuxtLink to="/" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
          返回首页
        </NuxtLink>
      </div>
    </div>
    
    <div v-else class="text-center py-16 max-w-3xl mx-auto">
      <svg class="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 class="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">文章不存在或已被删除</h2>
      <p class="mt-2 text-gray-600 dark:text-gray-400">您尝试访问的文章可能已被移除或链接错误。</p>
      <NuxtLink to="/blog" class="mt-6 inline-block text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
        返回博客列表
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const postId = parseInt(route.params.id)

// 模拟博客文章数据
const posts = [
  {
    id: 1,
    title: 'Nuxt 3 入门指南',
    date: '2023-03-10',
    image: 'https://picsum.photos/seed/nuxt1/800/600',
    content: `Nuxt 3 是一个强大的 Vue.js 框架，它提供了许多功能，使开发 Vue.js 应用程序变得更加简单和高效。

在本文中，我们将探讨 Nuxt 3 的主要特性，包括自动路由、服务器端渲染、API 路由等。我们还将介绍如何设置一个新的 Nuxt 3 项目，以及如何使用 Nuxt 3 的各种功能来构建现代化的 Web 应用程序。

Nuxt 3 的自动路由功能允许您通过在 pages 目录中创建 Vue 组件来自动生成路由。这使得管理应用程序的路由变得非常简单，无需手动配置路由。

服务器端渲染是 Nuxt 3 的另一个重要特性，它可以提高应用程序的性能和 SEO。通过在服务器上渲染页面，Nuxt 3 可以减少客户端的加载时间，并使搜索引擎更容易索引您的内容。

API 路由允许您在 Nuxt 3 应用程序中创建 API 端点，而无需设置单独的后端服务器。这使得构建全栈应用程序变得更加简单。

总之，Nuxt 3 是一个功能强大的框架，它可以帮助您构建高性能、SEO 友好的 Vue.js 应用程序。`
  },
  {
    id: 2,
    title: 'Vue 3 组合式 API 详解',
    date: '2023-03-05',
    image: 'https://picsum.photos/seed/vue2/800/600',
    content: `Vue 3 的组合式 API 是 Vue.js 框架的一个重要更新，它提供了一种新的方式来组织和重用组件逻辑。

在本文中，我们将深入探讨 Vue 3 的组合式 API，包括 setup 函数、响应式 API、生命周期钩子等。我们还将比较组合式 API 和选项式 API，并讨论何时使用每种方法。

组合式 API 的核心是 setup 函数，它在组件创建之前执行，并返回要暴露给模板的数据和方法。这使得组件逻辑更加集中和可重用。

响应式 API，如 ref 和 reactive，允许您创建响应式数据，当数据变化时，视图会自动更新。这使得管理组件状态变得更加简单。

生命周期钩子，如 onMounted 和 onUpdated，允许您在组件的不同生命周期阶段执行代码。这使得您可以更好地控制组件的行为。

与选项式 API 相比，组合式 API 提供了更好的类型推断、更好的代码组织和更好的逻辑重用。然而，选项式 API 可能对初学者来说更容易理解。

总之，Vue 3 的组合式 API 是一个强大的工具，它可以帮助您构建更可维护、更可扩展的 Vue.js 应用程序。`
  },
  {
    id: 3,
    title: '使用 Tailwind CSS 构建响应式界面',
    date: '2023-02-28',
    image: 'https://picsum.photos/seed/tailwind3/800/600',
    content: `Tailwind CSS 是一个实用优先的 CSS 框架，它提供了大量的预定义类，使您可以快速构建自定义设计，而无需编写自定义 CSS。

在本文中，我们将探讨如何使用 Tailwind CSS 构建响应式界面，包括设置 Tailwind CSS、使用实用类、响应式设计等。我们还将介绍一些使用 Tailwind CSS 的最佳实践。

设置 Tailwind CSS 非常简单，您可以通过 npm 安装 Tailwind CSS，然后配置它以适应您的项目需求。Tailwind CSS 提供了一个配置文件，您可以在其中自定义颜色、字体、间距等。

Tailwind CSS 的实用类允许您直接在 HTML 中应用样式，而无需编写自定义 CSS。例如，您可以使用 text-center 类来居中文本，使用 bg-blue-500 类来设置蓝色背景。

Tailwind CSS 的响应式设计功能允许您为不同的屏幕尺寸创建不同的布局。您可以使用前缀，如 sm:、md:、lg: 等，来应用仅在特定屏幕尺寸上生效的样式。

使用 Tailwind CSS 的一些最佳实践包括使用组件提取重复的模式、使用 @apply 指令在 CSS 中使用 Tailwind 类、使用插件扩展 Tailwind 等。

总之，Tailwind CSS 是一个强大的工具，它可以帮助您快速构建自定义、响应式的界面，而无需编写大量的自定义 CSS。`
  },
  {
    id: 4,
    title: 'JavaScript 异步编程最佳实践',
    date: '2023-02-20',
    image: 'https://picsum.photos/seed/js4/800/600',
    content: `JavaScript 的异步编程是处理非阻塞操作的一种方式，如网络请求、文件操作等。理解和掌握异步编程对于构建高性能的 JavaScript 应用程序至关重要。

在本文中，我们将探讨 JavaScript 异步编程的最佳实践，包括回调函数、Promise、async/await 等。我们还将讨论如何处理错误、如何并行执行异步操作等。

回调函数是 JavaScript 中最基本的异步编程方式，但它们可能导致"回调地狱"，使代码难以理解和维护。Promise 提供了一种更结构化的方式来处理异步操作，它允许您链接操作并处理错误。

async/await 是 ES2017 引入的一种新的异步编程方式，它基于 Promise，但使代码看起来更像同步代码，更容易理解和维护。使用 async/await，您可以使用 try/catch 块来处理错误，就像在同步代码中一样。

并行执行异步操作可以提高应用程序的性能。您可以使用 Promise.all() 来并行执行多个 Promise，并等待它们全部完成。如果您只关心第一个完成的 Promise，可以使用 Promise.race()。

处理错误是异步编程的一个重要方面。您应该始终捕获和处理异步操作中的错误，以防止它们导致应用程序崩溃。使用 Promise 的 catch() 方法或 async/await 的 try/catch 块来处理错误。

总之，JavaScript 的异步编程是一个强大的工具，它可以帮助您构建高性能、响应式的应用程序。通过理解和应用这些最佳实践，您可以更有效地使用异步编程。`
  },
  {
    id: 5,
    title: 'TypeScript 类型系统进阶',
    date: '2023-02-15',
    image: 'https://picsum.photos/seed/ts5/800/600',
    content: `TypeScript 是 JavaScript 的超集，它添加了静态类型检查和其他功能，使代码更可靠、更易于维护。TypeScript 的类型系统是其最强大的特性之一。

在本文中，我们将深入探讨 TypeScript 的类型系统，包括基本类型、接口、类型别名、泛型、条件类型等。我们还将介绍一些高级类型技巧，如映射类型、索引类型等。

TypeScript 的基本类型包括 string、number、boolean、array、tuple、enum、any、void 等。这些类型允许您为变量、函数参数和返回值指定类型，从而在编译时捕获类型错误。

接口和类型别名允许您定义自定义类型。接口主要用于描述对象的形状，而类型别名可以为任何类型创建新名称。两者都支持扩展其他接口或类型。

泛型允许您创建可重用的组件，这些组件可以与多种类型一起工作。泛型使您的代码更加灵活，同时保持类型安全。

条件类型允许您基于条件表达式选择类型。这使得您可以创建更复杂、更灵活的类型。条件类型通常与泛型一起使用，以创建高度可定制的类型。

映射类型允许您基于现有类型创建新类型，通过转换现有类型的属性。索引类型允许您使用动态属性名，同时保持类型安全。

总之，TypeScript 的类型系统是一个强大的工具，它可以帮助您编写更可靠、更易于维护的代码。通过深入理解和应用这些高级类型特性，您可以更有效地使用 TypeScript。`
  },
  {
    id: 6,
    title: 'Web 性能优化技巧',
    date: '2023-02-10',
    image: 'https://picsum.photos/seed/perf6/800/600',
    content: `Web 性能对用户体验和搜索引擎优化至关重要。慢速网站可能导致用户流失和搜索排名下降。因此，了解和应用 Web 性能优化技巧对于任何 Web 开发人员都是必不可少的。

在本文中，我们将探讨一些 Web 性能优化技巧，包括资源优化、代码优化、缓存策略等。我们还将介绍一些工具和技术，帮助您测量和改进 Web 性能。

资源优化是提高 Web 性能的关键。这包括压缩和最小化 CSS 和 JavaScript 文件、优化图像、使用适当的图像格式、延迟加载非关键资源等。通过减少资源的大小和数量，您可以减少页面加载时间。

代码优化也是提高 Web 性能的重要方面。这包括减少 DOM 操作、避免阻塞渲染的 JavaScript、使用高效的 CSS 选择器、避免重排和重绘等。通过优化代码，您可以提高页面的渲染速度和响应性。

缓存策略可以显著提高 Web 性能。通过正确设置 HTTP 缓存头，您可以让浏览器缓存资源，减少网络请求。您还可以使用服务工作者来实现离线缓存，提高应用程序的可靠性和性能。

测量和监控 Web 性能是优化过程的重要部分。您可以使用工具，如 Lighthouse、WebPageTest、Chrome DevTools 等，来测量和分析 Web 性能。这些工具可以帮助您识别性能瓶颈和优化机会。

总之，Web 性能优化是一个持续的过程，它需要了解和应用各种技巧和最佳实践。通过关注资源优化、代码优化、缓存策略等方面，您可以显著提高 Web 应用程序的性能和用户体验。`
  }
]

const post = computed(() => posts.find(p => p.id === postId))

definePageMeta({
  title: route => `${route.params.id ? posts.find(p => p.id === parseInt(route.params.id))?.title : '文章详情'}`
})
</script> 
