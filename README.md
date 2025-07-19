
# Vue Scroll Area

A Vue 3 component for a scroll area with DOM-level custom scrollbar.
## Credit

Idea and original implementation are come from [@07akioni](https://github.com/07akioni) 

Repo: [react-scroll-area-demo](https://github.com/07akioni/react-scroll-area-demo)

I just learn and port it to Vue 3.

## Installation

```bash
pnpm i vue-scroll-area
```
## Usage

### Basic
```vue
<template>
  <ScrollArea :style="{ height: '200px' }">
    <div class="content">
      Your scrollable content goes here.
    </div>
  </ScrollArea>
</template>
<script setup lang="ts">
import { ScrollArea } from 'vue-scroll-area'
</script>
```
### Resizeable content
```vue
<template>
  <ScrollArea :style="{ height: '200px' }">
    <ScrollAreaResizeableContent>
      resizable content
    </ScrollAreaResizeableContent>
  </ScrollArea>
</template>
<script setup lang="ts">
import { ScrollArea, ScrollAreaResizeableContent } from 'vue-scroll-area'
</script>
```

### Use scroll area with textarea

```vue
// TextareaScroll.vue
<template>
  <div>
    <h2>ScrollArea Demo: Textarea Scroll</h2>
    <ScrollArea :container-render="textareaContainerRenderer" />
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import type { ScrollAreaContainerRender } from '../components'
import { ScrollArea } from '../components'
import TextareaContainer from './TextareaContainer.vue'

const textareaContainerRenderer: ScrollAreaContainerRender = (props) => {
  return h(TextareaContainer, props)
}
</script>

```
```vue
// TextareaContainer.vue
<template>
  <div
    :style="{
      position: 'relative',
      boxShadow: 'inset 0 0 0 1px red',
      background: 'white',
      display: 'flex',
      width: '200px',
      height: '200px',
      overflow: 'hidden',
      resize: 'both',
      alignItems: 'stretch',
    }"
  >
    <ScrollAreaGutters position="absolute" />
    <textarea
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
import { ScrollAreaGutters } from '../components'
import type { ScrollAreaContainerProps } from '../components/public-types'

const props = defineProps<ScrollAreaContainerProps>()

const textareaRef = ref("Hello world\nHow\nare\nyou\ndoing\ntoday?")
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

```

## Development Setup

```shell
corepack prepare && pnpm i && pnpm dev
```