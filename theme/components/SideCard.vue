<template>
    <div class="side-card"><slot></slot></div>
</template>

<style scoped>
.side-card {
    padding: 1rem;
    margin-top: 1rem;
    background-color: var(--card-bg-color-opacity);
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.5);
    border-right: springgreen 3px solid;
    text-align: center;
    background-color: #ffffffaa;
}

.side-card:empty {
    display: none;
}
</style>

<style>
.side-card img {
    width: 1em;
    height: 1em;
    vertical-align: middle;
}
</style>