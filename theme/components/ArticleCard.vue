<template>
    <div class="card" id="article">
        <slot></slot>
    </div>
    <div class="card" id="Comment"></div>
</template>

<style scoped>
.card {
    display: block;
    position: relative;
    max-width: 30cm;
    box-sizing: border-box;
    margin: 1rem;
    padding: 2em;
    background-color: var(--card-bg-color);
    box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.5);
    overflow-x: auto;
}

@media (max-aspect-ratio: 3/5),
(max-width: 40em) {
    .card {
        margin: 1rem 0.5rem;
        padding: 1em;
    }
}
</style>

<style>
.articles a {
    position: relative;
    color: rgb(0, 123, 255);
}

.articles a::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: red;
    width: 100%;
    transform: scaleX(0.0);
    transform-origin: center center;
    transition-duration: 0.15s;
    transition-timing-function: linear;
}

.articles a:hover::after {
    transform: scaleX(1.0);
}
</style>