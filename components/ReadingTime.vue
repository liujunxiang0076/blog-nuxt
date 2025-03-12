<template>
  <span class="flex items-center text-sm text-gray-600 dark:text-gray-400">
    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    {{ readingTime }} 分钟阅读
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  content?: string;
}>();

const readingTime = computed(() => {
  if (!props.content) return 0;
  const wordsPerMinute = 275; // 中文阅读速度
  const wordCount = props.content.length;
  return Math.ceil(wordCount / wordsPerMinute);
});
</script> 
