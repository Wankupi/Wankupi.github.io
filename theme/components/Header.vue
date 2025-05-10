<template>
    <header class="top-panel">
        <span><a href="/">Wankupi's Blog</a></span>
        <span><a href="/about" title="关于">关于</a></span>
        <!-- <span><a href="/friends" title="友链">友链</a></span> -->
    </header>
</template>

<style scoped>
.top-panel {
    display: flex;
    position: fixed;
    justify-content: space-evenly;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    height: var(--top-panel-height);
    z-index: 10;
    background-color: var(--card-bg-color);
    transition-duration: 0.4s;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.5);
}

@media print {
    .top-panel {
        display: none;
    }
}
</style>