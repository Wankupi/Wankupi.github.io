<script setup lang="ts">
import ContactMe from "./ContactMe.vue";
import SideCard from "./SideCard.vue";
import { onMounted, ref } from "vue";
import { get_plan } from "@/client/leancloud";

let messages = ref<string[]>([]);

function load_messages() {
  get_plan()
    .then((res) => res.results)
    .then((res: { weight: number; text: string; createdAt: string }[]) => {
      return res
        .sort((a, b) => {
          return a.weight == b.weight ? (a.createdAt < b.createdAt ? 1 : -1) : b.weight - a.weight;
        })
        .map((x) => x.text);
    })
    .then((r) => {
      messages.value = r;
    });
}

onMounted(load_messages);
</script>

<template>
  <nav class="side">
    <slot name="up"></slot>
    <SideCard v-if="messages.length > 0">
      <h3>公告 & 计划</h3>
      <div v-for="msg in messages" :key="msg">
        {{ msg }}
      </div>
    </SideCard>
    <ContactMe />
    <slot name="bottom"></slot>
  </nav>
</template>

<style scoped>
nav.side {
  position: sticky;
  width: 100%;
  top: 3rem;
  margin-bottom: 2rem;
}

@media (orientation: portrait) {
  nav.side {
    position: static;
    margin: 0 0 var(--item-gap) 0;
  }
}
</style>
