<script setup lang="ts">

const props = defineProps<{
    title?: string,
    detail?: string,
    time?: string,
    icon?: string
}>();

</script>

<template>
    <div>
        <slot name="icon"></slot>
        <span>{{ title }}</span>
        <span>{{ time }}</span>
    </div>
</template>


<style scoped>
div {
    padding: 1em;
    background-color: aliceblue;
}
</style>