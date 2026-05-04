<script setup>
import { useData } from "vitepress";
import { computed } from "vue";
import SideCard from "@/components/SideCard.vue";

const { frontmatter, theme } = useData();

const author = computed(() => frontmatter.value.author || theme.value.author || "");
const license = computed(() => frontmatter.value.license || theme.value.license || { name: "", url: "" });
</script>

<template>
  <SideCard>
    <div class="copyright-info">
      <span>作者：{{ author }}</span>
      <span>版权：<a :href="license.url" target="_blank" rel="noopener noreferrer">{{ license.name }}</a></span>
      <span>转载请注明出处</span>
    </div>
  </SideCard>
</template>

<style scoped>
.copyright-info {
  font-size: 0.85em;
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  text-align: left;
}

.copyright-info a {
  color: var(--theme-color);
}
</style>
