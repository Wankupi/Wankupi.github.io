<script setup lang="ts">
import Header from "@/components/Header.vue";
import SideNav from "@/components/SideNav.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="rt-layout">
    <Header></Header>
    <main>
      <SideNav></SideNav>
      <article>
        <slot name="article"></slot>
      </article>
    </main>
    <Footer></Footer>
  </div>
</template>

<style scoped>
.rt-layout {
  --text-title-color: #000;
  --card-bg-color: #fff;
  --text-color: #000;
}

.rt-layout {
  position: relative;
  height: 100vh;
  overflow: auto;
  overflow-y: scroll;
}

.rt-layout::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: #eee;
  background-image: url("/static/images/background/home-main.jpg");
}

main {
  margin-left: auto;
  margin-right: auto;
  max-width: 30cm;
  margin-top: var(--top-panel-height);

  display: grid;
  grid-template-columns: minmax(0, 1fr) 17em;
  grid-auto-flow: dense;
  align-items: start;
  min-height: calc(100vh - var(--top-panel-height) - var(--footer-height));
}

main > *:nth-child(1) {
  grid-column: 2;
}

main > *:nth-child(2) {
  grid-column: 1;
}

@media (orientation: portrait) {
  main {
    grid-template-columns: minmax(0, 1fr);
  }
  main > *:nth-child(1) {
    grid-column: 1;
    grid-row: 2;
  }
  main > *:nth-child(2) {
    grid-column: 1;
    grid-row: 1;
  }
}

article {
  padding: var(--item-gap);
}
article > *:last-child {
  margin-bottom: 0;
}
</style>

<style>
a {
  text-decoration: none;
  color: var(--text-color);
}

html {
  --top-panel-height: 3rem;
  --footer-height: 8rem;
  --item-gap: 1rem;
  scroll-behavior: smooth;
  scroll-padding-top: var(--top-panel-height);
}
</style>
