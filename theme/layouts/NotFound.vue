<script setup lang="ts">
import { withBase } from "vitepress";

const goBack = (): void => {
  try {
    if (typeof history !== "undefined" && history.length > 1) {
      history.back();
      return;
    }
  } catch (e) {
    // ignore
  }
  window.location.href = withBase('/');
};

const goHome = (): void => {
  window.location.href = withBase('/');
};
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面未找到</p>
    <div class="actions">
      <button class="btn" @click="goBack">返回上一页</button>
      <button class="btn" @click="goHome">返回首页</button>
    </div>
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

/* unified button styles handled by .not-found .btn */

.not-found .actions {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.not-found .btn {
  padding: 0.75rem 1.5rem;
  background-color: var(--brand, #0066cc);
  color: white;
  border-radius: 4px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  min-width: 160px;
}

.not-found .btn:hover {
  opacity: 0.8;
}
</style>
