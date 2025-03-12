---
title: Nuxt 3 入门指南
date: 2024-03-20
category: 前端开发
tags: 
  - Nuxt
  - Vue
  - TypeScript
image: /images/nuxt3.webp
summary: 本文将带你快速入门 Nuxt 3，了解其核心概念和基本用法，以及如何构建一个现代化的 SSR 应用。
---

# Nuxt 3 入门指南

Nuxt 3 是一个基于 Vue 3 的全栈框架，它提供了许多开箱即用的功能，让开发者能够快速构建现代化的 Web 应用。本文将介绍 Nuxt 3 的核心概念和基本用法。

## 为什么选择 Nuxt 3？

Nuxt 3 相比于传统的 Vue 应用有以下优势：

1. **服务器端渲染 (SSR)**：提供更好的首屏加载性能和 SEO
2. **自动路由**：基于文件系统的路由配置
3. **API 层**：内置的服务器 API 功能
4. **TypeScript 支持**：默认支持 TypeScript
5. **模块化**：丰富的模块生态系统

## 快速开始

使用以下命令创建一个新的 Nuxt 3 项目：

```bash
npx nuxi init my-nuxt-app
cd my-nuxt-app
pnpm install
pnpm dev
```

## 项目结构

一个典型的 Nuxt 3 项目结构如下：

```plaintext
my-nuxt-app/
  ├── app.vue          # 应用入口
  ├── pages/           # 页面目录
  ├── components/      # 组件目录
  ├── layouts/         # 布局目录
  ├── composables/     # 组合式函数
  ├── server/          # 服务器 API
  └── nuxt.config.ts   # Nuxt 配置文件
```

## 核心概念

### 1. 页面路由

Nuxt 3 使用基于文件系统的路由。在 `pages` 目录下创建的文件会自动生成对应的路由：

```vue
<!-- pages/index.vue -->
<template>
  <div>
    <h1>首页</h1>
    <p>欢迎使用 Nuxt 3</p>
  </div>
</template>
```

### 2. 组件自动导入

Nuxt 3 会自动导入 `components` 目录下的组件：

```vue
<!-- components/Button.vue -->
<template>
  <button class="btn">
    <slot />
  </button>
</template>

<!-- 在其他组件中使用 -->
<template>
  <Button>点击我</Button>
</template>
```

### 3. 数据获取

Nuxt 3 提供了多种数据获取方式：

```vue
<script setup>
// 组合式函数
const { data } = await useFetch('/api/posts')

// 服务器端获取
const { data: posts } = await useAsyncData('posts', () => {
  return queryContent('posts').find()
})
</script>
```

### 4. 状态管理

使用 `useState` 进行跨组件状态管理：

```typescript
// composables/useCounter.ts
export const useCounter = () => useState('counter', () => 0)

// 在组件中使用
const counter = useCounter()
const increment = () => counter.value++
```

## 部署

Nuxt 3 应用可以部署为静态网站或 Node.js 服务：

```bash
# 静态网站
pnpm generate

# Node.js 服务
pnpm build
```

## 最佳实践

1. **使用 TypeScript**：充分利用 TypeScript 提供的类型安全
2. **组件设计**：遵循单一职责原则，保持组件的可复用性
3. **性能优化**：使用内置的图片优化、代码分割等功能
4. **错误处理**：实现全局错误处理和自定义错误页面
5. **测试**：编写单元测试和端到端测试

## 结语

Nuxt 3 是一个强大的全栈框架，它不仅简化了 Vue 应用的开发流程，还提供了许多实用的功能。通过本文的介绍，相信你已经对 Nuxt 3 有了基本的了解。接下来，就让我们开始动手实践，构建你的第一个 Nuxt 3 应用吧！ 
