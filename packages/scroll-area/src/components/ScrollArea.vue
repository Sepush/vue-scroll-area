<script setup lang="ts">
import { ref, onUnmounted, type Ref, type VNode, watchEffect, computed, provide } from 'vue'
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

const slots = defineSlots<{
  default(): VNode[]
}>()

const isDefaultContainer = containerRender === undefined
const containerDomRef = ref<HTMLElement | null>(null)
const horizontalBarRef = ref<HTMLDivElement | null>(null)
const horizontalGutterRef = ref<HTMLDivElement | null>(null)
const verticalBarRef = ref<HTMLDivElement | null>(null)
const verticalGutterRef = ref<HTMLDivElement | null>(null)

let teardownFn: (() => void) | null = null
let deriveScrollingStatusFn: (() => void) | null = null

const scrollAreaContext = {
  registerScrollBars: (refs: {
    horizontalBarRef: Ref<HTMLDivElement | null>
    horizontalGutterRef: Ref<HTMLDivElement | null>
    verticalBarRef: Ref<HTMLDivElement | null>
    verticalGutterRef: Ref<HTMLDivElement | null>
  }) => {
    horizontalBarRef.value = refs.horizontalBarRef.value
    horizontalGutterRef.value = refs.horizontalGutterRef.value
    verticalBarRef.value = refs.verticalBarRef.value
    verticalGutterRef.value = refs.verticalGutterRef.value
  },
  deriveScrollingStatus
}

provide(scrollAreaInjectionKey, scrollAreaContext)

function deriveScrollingStatus() {
  deriveScrollingStatusFn?.()
}

const onContainerResize = () => {
  const offsetHeight = containerDomRef.value?.offsetHeight
  verticalGutterRef.value!.style.setProperty('--container-height', `${offsetHeight}px`)
  horizontalGutterRef.value!.style.setProperty('--container-height', `${offsetHeight}px`)
  deriveScrollingStatus()
}

const containerProps = computed(() => ({
  containerDomRef,
  style,
  scrollAreaClass: 'scroll-area',
  onContainerScroll: deriveScrollingStatus,
  onContainerResize,
  onContentResize: deriveScrollingStatus,
}))

watchEffect(() => {
  if(!containerDomRef.value||!horizontalBarRef.value||!horizontalGutterRef.value||!verticalBarRef.value||!verticalGutterRef.value) {
    return
  }
  onContainerResize()
})

watchEffect(()=>{
  if(!containerDomRef.value||!horizontalBarRef.value||!horizontalGutterRef.value||!verticalBarRef.value||!verticalGutterRef.value) {
    return
  }
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
    horizontalBar: horizontalBarRef.value!,
    horizontalGutter: horizontalGutterRef.value!,
    verticalBar: verticalBarRef.value!,
    verticalGutter: verticalGutterRef.value!
  })
  
  teardownFn = teardown
  deriveScrollingStatusFn = derive
})

watchEffect(()=>{
  if(!deriveScrollingStatus) {
    return
  }
  deriveScrollingStatus()
})

onUnmounted(() => {
  teardownFn?.()
})
</script>

<template>
  <ScrollAreaContainerDefault
    v-if="isDefaultContainer"
    v-bind="containerProps"
  >
    <slot />
  </ScrollAreaContainerDefault>
  <component
    v-else
    :is="containerRender?.(containerProps)"
  />
</template>