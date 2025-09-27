<script setup lang="ts">
import SideCard from "./SideCard.vue";
import { Icon } from "@iconify/vue";
</script>

<template>
  <SideCard class="contact-me">
    <a
      href="mailto:kunpengWang@sjtu.edu.cn"
      title="email"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon icon="mdi:email" width="1.2em" />
    </a>
    <a
      href="https://github.com/Wankupi"
      title="github"
      target="_blank"
      rel="noopener noreferrer"
      ><Icon icon="mdi:github" width="1.2em"
    /></a>
    <a
      href="https://wpa.qq.com/msgrd?v=3&uin=2893353848&site=qq&menu=yes"
      title="qq"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon icon="simple-icons:qq" width="1.2em" />
    </a>
  </SideCard>
</template>

<style>
.contact-me {
  display: flex;
  justify-content: space-around;
}

.contact-me img {
  width: 1.5rem;
  height: 1.5rem;
  transition: linear 0.2s;
}

.contact-me img:hover {
  box-shadow: 0 0 3px black;
}
</style>
