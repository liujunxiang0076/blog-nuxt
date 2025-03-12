import { promises as fs } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import type { Post } from '~/types'

export default defineEventHandler(async () => {
  try {
    const postsDir = join(process.cwd(), 'content/posts')
    const files = await fs.readdir(postsDir)
    const markdownFiles = files.filter(file => file.endsWith('.md'))
    
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
    return allPosts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  } catch (e) {
    console.error('Error fetching posts:', e)
    throw createError({
      statusCode: 500,
      message: '获取文章失败'
    })
  }
}) 
