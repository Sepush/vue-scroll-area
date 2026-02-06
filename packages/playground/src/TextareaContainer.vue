<template>
  <div
    :style="{
      position: 'relative',
      background: 'white',
      display: 'flex',
      width: '300px',
      height: '200px',
      overflow: 'hidden',
      resize: 'both',
      alignItems: 'stretch',
      border: '2px solid #007acc',
      borderRadius: '8px',
    }"
  >
    <ScrollAreaGutters position="absolute" />
    <textarea
      :class="props.scrollAreaClass"
      :ref="(el: any) => { props.containerDomRef.value = el }"
      v-model="textareaRef"
      @scroll="props.onContainerScroll"
      :style="{
        background: 'transparent',
        ...textareaSharedStyle,
      }"
    />
    <div
      ref="contentDomRef"
      class="textarea-mirror"
      :style="textMirrorStyle"
    >
      {{ textareaRef }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ScrollAreaGutters } from 'vue-scroll-area'
import type { ScrollAreaContainerProps } from 'vue-scroll-area'

const props = defineProps<ScrollAreaContainerProps>()

const textareaRef = ref(`Hello world! 这是一个带有自定义滚动条的文本区域演示。

你可以在这里输入文本，当内容超出容器大小时，会显示自定义的滚动条而不是浏览器原生的滚动条。

这个组件的特点：
1. 完全自定义的滚动条样式
2. 支持水平和垂直滚动
3. 可以与任何可滚动元素配合使用
4. 响应式设计

试试输入更多文本，或者拖拽右下角来调整大小！

How
are
you
doing
today?
This is a very long line that should cause horizontal scrolling when the container is narrow enough.
这是一行很长的中文文本，当容器宽度不够时应该会出现水平滚动条。`)
const contentDomRef = ref<HTMLDivElement | null>(null)
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  resizeObserver = new ResizeObserver(() => {
    props.onContentResize?.()
    props.onContainerResize()
  })

  if (props.containerDomRef.value) {
    resizeObserver.observe(props.containerDomRef.value)
  }
  if (contentDomRef.value) {
    resizeObserver.observe(contentDomRef.value)
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
})

const textareaSharedStyle = {
  fontFamily: "system-ui",
  display: "block",
  boxSizing: "border-box",
  padding: "12px",
  fontSize: "14px",
  lineHeight: "1.6",
  border: "none",
  textAlign: "start",
  width: "100%",
} as const
const textMirrorStyle = {
  position: "absolute",
  left: "0",
  top: "0",
  whiteSpace: "pre-wrap",
  pointerEvents: "none",
  visibility: "hidden",
  ...textareaSharedStyle,
} as const
</script>
