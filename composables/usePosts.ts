import { ref, computed } from 'vue'
import postsData from '~/data/posts.json'
import type { Post } from '~/types'

export const usePosts = () => {
  const posts = ref<Post[]>(postsData.posts)

  // 获取所有分类
  const categories = computed(() => {
    const categorySet = new Set(posts.value.map(post => post.category))
    return Array.from(categorySet)
  })

  // 获取所有标签
  const tags = computed(() => {
    const tagSet = new Set(posts.value.flatMap(post => post.tags))
    return Array.from(tagSet)
  })

  // 按分类获取文章
  const getPostsByCategory = (category: string) => {
    return computed(() => {
      return posts.value.filter(post => post.category === category)
    })
  }

  // 按标签获取文章
  const getPostsByTag = (tag: string) => {
    return computed(() => {
      return posts.value.filter(post => post.tags.includes(tag))
    })
  }

  // 搜索文章
  const searchPosts = (query: string) => {
    query = query.toLowerCase()
    return posts.value.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // 获取单篇文章
  const getPost = (id: string) => {
    return posts.value.find(post => post.id === id)
  }

  // 获取相关文章
  const getRelatedPosts = (currentPost: Post, limit = 5) => {
    const currentTags = new Set(currentPost.tags)
    
    return posts.value
      .filter(post => post.id !== currentPost.id)
      .map(post => {
        let score = 0
        
        // 根据标签计算相关度
        const commonTags = post.tags.filter(tag => currentTags.has(tag))
        score += commonTags.length * 2
        
        // 相同分类加分
        if (post.category === currentPost.category) {
          score += 3
        }
        
        return { ...post, score }
      })
      .filter(post => post.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  }

  return {
    posts,
    categories,
    tags,
    getPostsByCategory,
    getPostsByTag,
    searchPosts,
    getPost,
    getRelatedPosts
  }
} 
