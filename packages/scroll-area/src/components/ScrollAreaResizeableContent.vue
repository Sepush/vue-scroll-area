<script setup lang="ts">
import { inject, onWatcherCleanup, useTemplateRef, watchEffect } from 'vue';
import { scrollAreaInjectionKey } from './context';

useTemplateRef<HTMLDivElement>('dom');

const scrollAreaContext = inject(scrollAreaInjectionKey, null);

watchEffect(() => {
  const resizeObserver = new ResizeObserver(() => {
    scrollAreaContext?.deriveScrollingStatus?.();
  });

  onWatcherCleanup(() => {
    resizeObserver?.disconnect();
  })
});
</script>

<template>
  <div class="scroll-area-content" ref="dom">
    <slot />
  </div>
</template>