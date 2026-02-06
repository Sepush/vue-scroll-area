<script setup lang="ts">
import { onBeforeUnmount, onMounted, nextTick } from 'vue'
import ScrollAreaGutters from './ScrollAreaGutters.vue';
import type { ScrollAreaContainerProps } from './public-types'

const {
  scrollAreaClass,
  containerDomRef,
  onContainerScroll,
  onContainerResize,
  style,
} = defineProps<ScrollAreaContainerProps>()

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  resizeObserver = new ResizeObserver(()=>{
    nextTick(() => {
      onContainerResize?.()
    })
  })
  if (containerDomRef.value) {
    resizeObserver.observe(containerDomRef.value)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})
</script>

<template>
  <div
    :class="scrollAreaClass"
    :ref="(el) => { containerDomRef.value = el as HTMLElement }"
    :style="style"
    @scroll="onContainerScroll"
  >
    <ScrollAreaGutters />
    <slot />
  </div>
</template>