import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-sql';

// 创建自定义渲染器
const renderer = new marked.Renderer();

// 重写代码块渲染
renderer.code = (code, language = '') => {
  // 不使用 Prism 高亮，直接返回原始代码
  const escapedCode = encodeURIComponent(code);
  
  return `
    <div class="code-block relative group">
      <div class="flex items-center justify-between px-4 py-2 bg-gray-800/50 rounded-t-lg border-b border-gray-700">
        <span class="text-xs font-mono text-gray-400">${language || '纯文本'}</span>
        <button
          class="copy-button flex items-center gap-2 px-3 py-1 text-xs text-gray-400 hover:text-gray-300 transition-colors"
          data-code="${escapedCode}"
        >
          复制代码
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
      <pre class="language-${language}"><code class="language-${language}">${code}</code></pre>
    </div>
  `;
};

// 配置 marked 选项
marked.setOptions({
  renderer,
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false,
  silent: true // 忽略解析错误
});

// 渲染 Markdown
export function renderMarkdown(content: string): string {
  try {
    return marked(content);
  } catch (error) {
    console.error('Markdown 渲染失败:', error);
    return `<div class="text-red-500">Markdown 渲染失败: ${error instanceof Error ? error.message : '未知错误'}</div>`;
  }
} 
