<script setup lang="ts">
import { onUnmounted, onMounted, nextTick } from 'vue'
import ScrollAreaGutters from './ScrollAreaGutters.vue';
import type { ScrollAreaContainerProps } from './public-types'

const { 
  containerDomRef,
  onContainerScroll,
  onContainerResize,
  style,
} = defineProps<ScrollAreaContainerProps>()

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  resizeObserver = new ResizeObserver(()=>{
    nextTick(() => {
      onContainerResize()
    })
  })
  if (containerDomRef.value) {
    resizeObserver.observe(containerDomRef.value)
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
})
</script>

<template>
  <div
    class="scroll-area"
    :ref="(el) => { containerDomRef.value = el as HTMLElement }"
    :style="style"
    @scroll="onContainerScroll"
  >
    <ScrollAreaGutters />
    <slot />
  </div>
</template>