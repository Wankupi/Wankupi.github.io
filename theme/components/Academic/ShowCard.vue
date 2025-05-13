<script setup lang="ts">

const props = defineProps<{
    title?: string,
    detail?: string,
    time?: string,
    icon?: string
}>();

</script>

<template>
    <div class="show-card">
        <div class="main-info">
            <slot name="icon"></slot>
            <span class="title">{{ title }}</span>
            <span>{{ time }}</span>
        </div>
        <div v-if="detail">{{ detail }}</div>
    </div>
</template>


<style scoped>
.show-card {
    padding: 1em;
    background-color: aliceblue;
    margin-bottom: 0.5em;;
}

.main-info {
    display: grid;
    grid-template-columns: 2em 1fr auto;
}
</style>