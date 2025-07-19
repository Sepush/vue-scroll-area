<script setup lang="ts">
import Basic from './Basic.vue'
import TextareaScroll from './TextareaScroll.vue'
</script>

<template>
  <div>
    <h1 style="text-align: center; color: #333; margin-bottom: 2rem;">Vue Scroll Area Playground</h1>
    
    <div class="demo-section">
      <h2><a href="#basic">Basic ScrollArea</a></h2>
      <Basic />
    </div>
    
    <div class="demo-section">
      <h2><a href="#textarea">Textarea with Custom ScrollArea</a></h2>
      <TextareaScroll />
    </div>
  </div>
</template>

