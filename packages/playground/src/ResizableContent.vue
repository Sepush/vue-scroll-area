<template>
  <ScrollArea :style="{ height: '200px' }" :verticalScrollbarMinHeight="16">
    <ScrollAreaResizeableContent>
      <div v-for="i in 36" :key="i" class="repeated-content">
        <div style="width: 1000px;">
          <h1>Resizable Content Demo</h1>
          <div class="card">
            <p>
              This content uses ScrollAreaResizeableContent wrapper
            </p>
          </div>
          <p class="read-the-docs">
            This demo shows resizable content with custom scrollbars
          </p>
        </div>
      </div>
    </ScrollAreaResizeableContent>
  </ScrollArea>
</template>

<script setup lang="ts">
import { ScrollArea, ScrollAreaResizeableContent } from 'vue-scroll-area';
</script>

<style scoped>
.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

.repeated-content {
  padding: 1em 0;
  border-bottom: 1px solid #eee;
}
</style>
