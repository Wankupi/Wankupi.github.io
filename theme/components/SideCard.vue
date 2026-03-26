<template>
    <div class="side-card"><slot></slot></div>
</template>

<style scoped>
.side-card {
    padding: 1rem;
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.5);
    border-right: var(--theme-color) 3px solid;
    text-align: center;
    background-color: #ffffffaa;
    border-radius: 0.3rem;
}

.side-card:empty {
    display: none;
}
</style>
