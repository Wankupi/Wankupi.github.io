<script setup lang="ts">
import SideCard from "./SideCard.vue";
import { Icon } from "@iconify/vue";
import { useData } from "vitepress";
import type { ContactItem } from "../config";

const { theme } = useData<any>();
const contacts = (theme.value.contacts ?? []) as ContactItem[];
</script>

<template>
  <SideCard class="contact-me" v-if="contacts.length">
    <a
      v-for="contact in contacts"
      :key="contact.title"
      :href="contact.href"
      :title="contact.title"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon :icon="contact.icon" width="1.2em" />
    </a>
  </SideCard>
</template>

<style scoped>
.contact-me {
  display: flex;
  justify-content: space-around;
}

.contact-me a {
  transition: color 0.2s;
}

.contact-me a:hover {
  color: var(--theme-color);
}
</style>
