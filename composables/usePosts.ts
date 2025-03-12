import { defineEventHandler } from 'h3'
import { promises as fs } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import type { Post } from '~/types'

export const usePosts = () => {
  const posts = useState<Post[]>('posts', () => [])
  const loading = useState<boolean>('posts-loading', () => true)
  const error = useState<string | null>('posts-error', () => null)

  // 获取所有文章
  const fetchPosts = async () => {
    try {
      loading.value = true
      error.value = null
      
      // 读取 content/posts 目录下的所有 .md 文件
      const postsDir = join(process.cwd(), 'content/posts')
      const files = await fs.readdir(postsDir)
      const markdownFiles = files.filter(file => file.endsWith('.md'))
      
      // 读取并解析每个文件
      const allPosts = await Promise.all(
        markdownFiles.map(async (file) => {
          const filePath = join(postsDir, file)
          const content = await fs.readFile(filePath, 'utf-8')
          const { data, content: markdown } = matter(content)
          
          return {
            ...data,
            slug: file.replace(/\.md$/, ''),
            content: markdown,
          } as Post
        })
      )
      
      // 按日期排序
      posts.value = allPosts.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
    } catch (e) {
      console.error('Error fetching posts:', e)
      error.value = e instanceof Error ? e.message : '获取文章失败'
    } finally {
      loading.value = false
    }
  }

  // 根据 slug 获取文章
  const getPostBySlug = (slug: string) => {
    return posts.value.find(post => post.slug === slug)
  }

  // 获取文章分类
  const getCategories = () => {
    const categories = new Set(posts.value.map(post => post.category).filter(Boolean))
    return Array.from(categories)
  }

  // 获取所有标签
  const getTags = () => {
    const tags = new Set(posts.value.flatMap(post => post.tags || []))
    return Array.from(tags)
  }

  // 根据分类获取文章
  const getPostsByCategory = (category: string) => {
    return posts.value.filter(post => post.category === category)
  }

  // 根据标签获取文章
  const getPostsByTag = (tag: string) => {
    return posts.value.filter(post => post.tags?.includes(tag))
  }

  // 初始加载
  onMounted(() => {
    fetchPosts()
  })

  return {
    posts: readonly(posts),
    loading: readonly(loading),
    error: readonly(error),
    getPostBySlug,
    getCategories,
    getTags,
    getPostsByCategory,
    getPostsByTag,
    refresh: fetchPosts
  }
} 
