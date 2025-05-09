<script setup lang="ts">
import ContactMe from './ContactMe.vue';
import SideCard from './SideCard.vue';
</script>

<template>
    <nav class="side">
        <slot name="up"></slot>
        <SideCard>
            <h3>文章目录</h3>
            <div class="catalog"></div>
        </SideCard>
        <SideCard>
            <div class="art-meta">
                <div class="art-type"></div>
                <div class="art-date"></div>
                <div class="art-read"></div>
                <div class="art-comment"></div>
            </div>
        </SideCard>
        <SideCard id="my_plan">
        </SideCard>
        <ContactMe />
        <slot name="bottom"></slot>
    </nav>
</template>

<style scoped>
nav.side {
    position: sticky;
    width: 16rem;
    top: 3rem;
    float: right;
    margin-bottom: 2rem;
    margin-right: var(--item-gap);
}
</style>