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
  const validLanguage = Prism.languages[language] ? language : 'plaintext';
  const highlightedCode = Prism.highlight(
    code,
    Prism.languages[validLanguage],
    validLanguage
  );

  return `
    &lt;div class="code-block relative group"&gt;
      &lt;div class="flex items-center justify-between px-4 py-2 bg-gray-800/50 rounded-t-lg border-b border-gray-700"&gt;
        &lt;span class="text-xs font-mono text-gray-400"&gt;${language || '纯文本'}&lt;/span&gt;
        &lt;button
          class="copy-button flex items-center gap-2 px-3 py-1 text-xs text-gray-400 hover:text-gray-300 transition-colors"
          data-code="${encodeURIComponent(code)}"
        &gt;
          复制代码
          &lt;svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"&gt;
            &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /&gt;
          &lt;/svg&gt;
        &lt;/button&gt;
      &lt;/div&gt;
      &lt;pre class="language-${validLanguage}"&gt;&lt;code class="language-${validLanguage}"&gt;${highlightedCode}&lt;/code&gt;&lt;/pre&gt;
    &lt;/div&gt;
  `;
};

// 配置 marked 选项
marked.setOptions({
  renderer,
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false
});

// 渲染 Markdown
export function renderMarkdown(content: string): string {
  return marked(content);
} 
