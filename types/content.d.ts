declare module '#content/types' {
  interface ParsedContent {
    _path: string
    title: string
    date: string
    image: string
    summary: string
    tags: string[]
    category: string
    body: {
      text: string
      toc: {
        links: Array<{
          id: string
          text: string
          depth: number
        }>
      }
    }
  }
}

export {} 
