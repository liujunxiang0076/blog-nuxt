<template>
  <div class="relative group not-prose">
    <div class="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900 rounded-t-lg border-b border-gray-700">
      <div v-if="language" class="text-xs font-mono text-gray-400">
        {{ languageDisplay }}
      </div>
      <button
        @click="copyCode"
        class="flex items-center gap-2 px-3 py-1 text-xs text-gray-400 hover:text-gray-300 transition-colors"
        :class="{ 'text-green-500 hover:text-green-400': copied }"
      >
        <span v-if="copied">已复制!</span>
        <span v-else>复制代码</span>
        <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </button>
    </div>
    <div class="relative">
      <pre class="!mt-0 !mb-0 !bg-gray-800 dark:!bg-gray-900 rounded-t-none rounded-b-lg">
        <code class="!p-4 block overflow-x-auto">
          <slot></slot>
        </code>
      </pre>
      <div
        v-if="copied"
        class="absolute top-2 right-2 px-3 py-1 text-sm text-green-500 bg-gray-900 rounded-md opacity-0 transition-opacity duration-300"
        :class="{ 'opacity-100': copied }"
      >
        已复制到剪贴板
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  language?: string;
  code: string;
}>();

const copied = ref(false);

const languageMap: Record<string, string> = {
  'js': 'JavaScript',
  'ts': 'TypeScript',
  'jsx': 'React JSX',
  'tsx': 'React TSX',
  'vue': 'Vue',
  'html': 'HTML',
  'css': 'CSS',
  'scss': 'SCSS',
  'less': 'Less',
  'json': 'JSON',
  'md': 'Markdown',
  'yaml': 'YAML',
  'bash': 'Bash',
  'sh': 'Shell',
  'python': 'Python',
  'py': 'Python',
  'java': 'Java',
  'cpp': 'C++',
  'c': 'C',
  'go': 'Go',
  'rust': 'Rust',
  'sql': 'SQL',
  'php': 'PHP',
  'ruby': 'Ruby',
  'swift': 'Swift',
  'kotlin': 'Kotlin',
  'docker': 'Dockerfile',
  'dockerfile': 'Dockerfile',
  'nginx': 'Nginx'
};

const languageDisplay = computed(() => {
  if (!props.language) return '纯文本';
  return languageMap[props.language.toLowerCase()] || props.language;
});

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy code:', err);
  }
};
</script>

<style scoped>
pre {
  margin: 0;
}

code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.875em;
  line-height: 1.7142857;
}

/* 自定义滚动条 */
code::-webkit-scrollbar {
  height: 4px;
}

code::-webkit-scrollbar-track {
  background: transparent;
}

code::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 2px;
}

code::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.5);
}
</style> 
