// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  css: [
    '~/assets/css/main.css',
    '~/assets/css/markdown.css',
    'prismjs/themes/prism-tomorrow.css'
  ],
  colorMode: {
    classSuffix: '',
    preference: 'system', // 默认跟随系统
    fallback: 'light',    // 回退到浅色模式
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  nitro: {
    publicAssets: [
      {
        dir: 'content',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      }
    ]
  },
  hooks: {
    'pages:extend'(pages) {
      pages.push({
        name: 'posts',
        path: '/posts/:slug',
        file: '~/pages/posts/[...slug].vue'
      })
    }
  }
})
