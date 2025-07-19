<script setup lang="ts">
import { inject, onMounted, useTemplateRef } from 'vue';
import type { ScrollAreaGuttersProps } from './public-types';
import { scrollAreaInjectionKey } from './context';

const {
  position = 'sticky',
} = defineProps<ScrollAreaGuttersProps>()

const scrollAreaContext = inject(scrollAreaInjectionKey)

const horizontalGutterRef = useTemplateRef<HTMLDivElement>('horizontalGutterRef')
const horizontalBarRef = useTemplateRef<HTMLDivElement>('horizontalBarRef')
const verticalGutterRef = useTemplateRef<HTMLDivElement>('verticalGutterRef')
const verticalBarRef = useTemplateRef<HTMLDivElement>('verticalBarRef')

onMounted(()=>{
  scrollAreaContext?.registerScrollBars({
    horizontalBarRef,
    horizontalGutterRef,
    verticalBarRef,
    verticalGutterRef
  });
})
</script>

<template>
  <div :class="['scroll-area-gutters', position]">
    <div class="horizontal-gutter" ref="horizontalGutterRef">
      <div class="horizontal-bar" ref="horizontalBarRef" />
    </div>
    <div class="vertical-gutter" ref="verticalGutterRef">
      <div class="vertical-bar" ref="verticalBarRef" />
    </div>
  </div>
</template>