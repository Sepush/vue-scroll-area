<template>
  <div>
    <p style="margin-bottom: 1rem; color: #666;">
      这个演示展示了如何将 ScrollArea 与 textarea 元素结合使用，创建一个带有自定义滚动条的文本输入区域。
    </p>
    
    <ScrollArea :container-render="textareaContainerRenderer" />
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import type { ScrollAreaContainerRender } from 'vue-scroll-area'
import { ScrollArea } from 'vue-scroll-area'
import TextareaContainer from './TextareaContainer.vue'

const textareaContainerRenderer: ScrollAreaContainerRender = (props) => {
  return h(TextareaContainer, props)
}
</script>
