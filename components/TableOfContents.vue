<template>
  <nav class="toc">
    <ul class="space-y-2">
      <li v-for="header in headers" :key="header.title" :style="{ paddingLeft: `${(header.level - 1) * 1}rem` }">
        <a
          :href="`#${slugify(header.title)}`"
          class="block py-1 text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-200"
          :class="{
            'font-medium': header.level === 1,
            'text-xs': header.level > 2
          }"
        >
          {{ header.title }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { Header } from '~/types';

defineProps<{
  headers: Header[];
}>();

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};
</script>

<style scoped>
.toc {
  @apply border-l-2 border-gray-200 dark:border-gray-700 pl-4;
}

.toc a {
  position: relative;
}

.toc a::before {
  content: '';
  position: absolute;
  left: -1.25rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: transparent;
  transition: background-color 0.2s ease;
}

.toc a:hover::before {
  @apply bg-primary-500;
}
</style> 
