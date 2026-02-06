<script setup lang="ts">
import { ref, computed, provide, onMounted, watch, onWatcherCleanup } from 'vue'
import type { ScrollAreaProps } from './public-types'
import { scrollAreaInjectionKey } from './context'
import { setupScrolling } from './setup-scroll'
import ScrollAreaContainerDefault from './ScrollContainerDefault.vue'
import './index.css'

const { 
  containerRender,
  verticalScrollbarMinHeight = 0,
  horizontalScrollbarMinWidth = 0,
  style,
} = defineProps<ScrollAreaProps>()

const containerDomRef = ref<HTMLElement | null>(null)
const horizontalBarRef = ref<HTMLDivElement | null>(null)
const horizontalGutterRef = ref<HTMLDivElement | null>(null)
const verticalBarRef = ref<HTMLDivElement | null>(null)
const verticalGutterRef = ref<HTMLDivElement | null>(null)
const deriveScrollingStatusRef = ref<(() => void)>(()=>{})

let teardownFn: (() => void) | null = null

const scrollElements = {
  horizontalBar: horizontalBarRef,
  horizontalGutter: horizontalGutterRef,
  verticalBar: verticalBarRef,
  verticalGutter: verticalGutterRef,
  deriveScrollingStatus: deriveScrollingStatusRef.value
}

provide(scrollAreaInjectionKey,scrollElements)

onMounted(()=>{
  const { teardown, deriveScrollingStatus: derive } = setupScrolling({
    getVerticalBarMinHeight: () => {
      const height = verticalScrollbarMinHeight
      return typeof height === 'string' ? parseInt(height) : (height || 0)
    },
    getHorizontalBarMinWidth: () => {
      const width = horizontalScrollbarMinWidth
      return typeof width === 'string' ? parseInt(width) : (width || 0)
    },
    getContainerHeight: () => containerDomRef.value!.offsetHeight,
    getContainerWidth: () => containerDomRef.value!.offsetWidth,
    getScrollLeft: () => containerDomRef.value!.scrollLeft,
    getScrollTop: () => containerDomRef.value!.scrollTop,
    getScrollHeight: () => containerDomRef.value!.scrollHeight,
    getScrollWidth: () => containerDomRef.value!.scrollWidth,
    setScrollLeft: (v: number) => {
      if (containerDomRef.value) {
        containerDomRef.value.scrollLeft = v
      }
    },
    setScrollTop: (v: number) => {
      if (containerDomRef.value) {
        containerDomRef.value.scrollTop = v
      }
    },
    horizontalBar: scrollElements.horizontalBar!.value!,
    horizontalGutter: scrollElements.horizontalGutter!.value!,
    verticalBar: scrollElements.verticalBar!.value!,
    verticalGutter: scrollElements.verticalGutter!.value!
  })
  
  teardownFn = teardown
  deriveScrollingStatusRef.value = derive
  deriveScrollingStatusRef.value()
})

const onContainerResize = () => {
  const offsetHeight = containerDomRef.value?.offsetHeight
  scrollElements.verticalGutter!.value!.style.setProperty('--container-height', `${offsetHeight}px`)
  scrollElements.horizontalGutter!.value!.style.setProperty('--container-height', `${offsetHeight}px`)
  deriveScrollingStatusRef.value?.()
}

const containerProps = computed(() => ({
  containerDomRef,
  style,
  scrollAreaClass: 'scroll-area',
  onContainerScroll: deriveScrollingStatusRef.value,
  onContainerResize,
  onContentResize: deriveScrollingStatusRef.value,
}))

watch([
  ()=>deriveScrollingStatusRef.value,
  ()=>horizontalScrollbarMinWidth,
  ()=> verticalScrollbarMinHeight
],([newDeriveScrollingStatus])=>{
  newDeriveScrollingStatus?.()

  onWatcherCleanup(() => {
    teardownFn?.()
  })
})
</script>

<template>
  <component
    v-if="containerRender"
    :is="containerRender?.(containerProps)"
  />
  <ScrollAreaContainerDefault
    v-else
    v-bind="containerProps"
  >
    <slot />
  </ScrollAreaContainerDefault>
</template>
