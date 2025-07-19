<script setup lang="ts">
import { inject, onMounted, onUnmounted, useTemplateRef } from 'vue';
import { scrollAreaInjectionKey } from './context';

const domRef = useTemplateRef<HTMLDivElement>('dom');

const scrollAreaContext = inject(scrollAreaInjectionKey, null);

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  resizeObserver = new ResizeObserver(() => {
    scrollAreaContext?.deriveScrollingStatus?.();
  });
  resizeObserver.observe(domRef.value!);
});

onUnmounted(() => {
  resizeObserver?.disconnect();
});
</script>

<template>
  <div class="scroll-area-content" ref="dom">
    <slot />
  </div>
</template>