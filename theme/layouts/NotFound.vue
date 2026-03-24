<script setup lang="ts">
import { withBase } from "vitepress";
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面未找到</p>
    <a :href="withBase('/')">返回首页</a>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
}

.not-found h1 {
  font-size: 4rem;
  margin: 0;
  font-weight: bold;
}

.not-found p {
  font-size: 1.2rem;
  margin: 1rem 0;
  color: var(--text-secondary, #666);
}

.not-found a {
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--brand, #0066cc);
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: opacity 0.2s;
}

.not-found a:hover {
  opacity: 0.8;
}
</style>
