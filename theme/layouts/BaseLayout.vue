<script setup lang="ts">
import Header from '../components/Header.vue';
import SideNav from '../components/SideNav.vue';
import Footer from '../components/Footer.vue';
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
    --top-panel-height: 3em;
    --item-gap: 1rem;
    --text-title-color: #000;
    --card-bg-color: #fff;
}

.rt-layout {
    background: linear-gradient(to bottom, #f4f7f7, #fff);
}

main {
    margin-left: auto;
    margin-right: auto;
    max-width: 30cm;
    padding-top: var(--top-panel-height);

    display: grid;
    grid-template-columns: auto 17em;
    grid-auto-flow: dense;
    align-items: start;
}

main>*:nth-child(1) {
    grid-column: 2;
}

main>*:nth-child(2) {
    grid-column: 1;
}

article {
    min-height: calc(100vh - var(--top-panel-height));
    padding: var(--item-gap);
}
</style>