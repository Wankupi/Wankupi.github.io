<script setup>
import { useData } from "vitepress";
import { computed } from "vue";

const { theme } = useData();
const author = computed(() => theme.value.author || "");
const license = computed(() => theme.value.license || { name: "", url: "" });
</script>

<template>
  <footer>
    <div>Copyright &copy; 2020~2026 {{ author }}</div>
    <div>个人博客 | 我说我是乱写</div>
    <div>
      站内文章采用
      <a
        :href="license.url"
        target="_blank"
        rel="noopener noreferrer"
        class="license"
        >{{ license.name }}</a
      >
    </div>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  font-size: small;
  color: var(--text-color);
  min-height: var(--footer-height);
  padding: 2rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(12px) saturate(1.1);
  background-color: color-mix(in srgb, var(--card-bg-color) 85%, white 15%);
}
</style>
