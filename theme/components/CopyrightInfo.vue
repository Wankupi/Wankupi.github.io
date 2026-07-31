<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import SideCard from "@/components/SideCard.vue";

const { frontmatter, theme } = useData();

const author = computed(() => frontmatter.value.author || theme.value.author || "");
const license = computed(() => frontmatter.value.license || theme.value.license || { name: "", url: "" });

const dateTimeFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit"
});

function toTs(v: unknown): number | null {
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (v instanceof Date) return v.getTime();
  if (typeof v === "string") {
    const p = Date.parse(v);
    return Number.isNaN(p) ? null : p;
  }
  return null;
}

const createdAt = computed(() => toTs(frontmatter.value.created_at));
const updatedAt = computed(() => toTs(frontmatter.value.updated_at));
const showUpdated = computed(
  () => updatedAt.value !== null && (createdAt.value === null || updatedAt.value - createdAt.value > 24 * 3600 * 1000)
);
const hasTimes = computed(() => createdAt.value !== null || updatedAt.value !== null);
</script>

<template>
  <SideCard>
    <div class="meta-card">
      <div v-if="hasTimes" class="time-info">
        <div v-if="createdAt" class="time-item">
          <Icon icon="mdi:calendar-plus-outline" class="time-icon"></Icon>
          <span>创建于 {{ dateTimeFormatter.format(new Date(createdAt)) }}</span>
        </div>
        <div v-if="showUpdated" class="time-item">
          <Icon icon="mdi:update" class="time-icon updated-icon"></Icon>
          <span>更新于 {{ dateTimeFormatter.format(new Date(updatedAt!)) }}</span>
        </div>
      </div>
      <div class="copyright-info" :class="{ 'has-times': hasTimes }">
        <span>作者：{{ author }}</span>
        <span>版权：<a :href="license.url" target="_blank" rel="noopener noreferrer">{{ license.name }}</a></span>
        <span>转载请注明出处</span>
      </div>
    </div>
  </SideCard>
</template>

<style scoped>
.meta-card {
  font-size: 0.85em;
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  text-align: left;
}

.time-info {
  display: flex;
  flex-direction: column;
  gap: 0.3em;
}

.time-item {
  display: flex;
  align-items: center;
  gap: 0.3em;
}

.time-icon {
  flex: none;
  font-size: 1.05em;
  line-height: 1;
  color: gray;
}

.updated-icon {
  color: var(--theme-color);
}

.copyright-info {
  display: flex;
  flex-direction: column;
  gap: 0.3em;
}

.copyright-info.has-times {
  padding-top: 0.5em;
  margin-top: 0.2em;
  border-top: 1px dashed color-mix(in srgb, var(--theme-color) 30%, transparent);
}

.copyright-info a {
  color: var(--theme-color);
}
</style>
