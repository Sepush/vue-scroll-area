<template>
  <div>
    <p style="margin-bottom: 1rem; color: #666;">
      这个演示展示了一个带有自定义滚动条的可滚动区域。内容既可以垂直滚动也可以水平滚动。
    </p>
    
    <ScrollArea 
      :style="{ 
        height: '400px', 
        border: '2px solid #007acc', 
        borderRadius: '8px',
        backgroundColor: '#fff'
      }" 
      verticalScrollbarMinHeight="20" 
      horizontal-scrollbar-min-width="20"
    >
      <div style="background: linear-gradient(45deg, #ffeb3b, #fff59d); padding: 20px; min-height: 800px;">
        <div v-for="i in 20" :key="i" class="repeated-content">
          <div style="width: 1200px; background: rgba(224, 247, 250, 0.8); padding: 15px; border-radius: 6px;">
            <h3 style="margin: 0 0 10px 0; color: #333;">Vite + Vue {{ i }}</h3>
            <div class="card">
              <p>
                Edit <code style="background: #f5f5f5; padding: 2px 6px; border-radius: 3px;">src/App.vue</code> and save to test HMR
              </p>
            </div>
            <p class="read-the-docs">
              This is a scrollable content area demo - Item {{ i }}
            </p>
          </div>
        </div>
      </div>
    </ScrollArea>
  </div>
</template>

<script setup lang="ts">
import { ScrollArea } from 'vue-scroll-area';
</script>

<style scoped>
.card {
  padding: 1em;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  margin: 10px 0;
}

.read-the-docs {
  color: #666;
  font-size: 0.9em;
  margin: 10px 0;
}

.repeated-content {
  margin: 0 0 15px 0;
}
</style>