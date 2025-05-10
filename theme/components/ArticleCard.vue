<template>
    <div class="card" id="article">
        <Content />
    </div>
    <!-- <div class="card" id="Comment"></div> -->
</template>

<style scoped>
.card {
    display: block;
    position: relative;
    max-width: 30cm;
    padding: 2em;
    background-color: var(--card-bg-color);
    box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.5);
    overflow-x: auto;
    margin-bottom: var(--item-gap);
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
.card img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 20em;
    /* display: block; */
    margin-left: auto;
    margin-right: auto;
}

.card#article {
    text-indent: 2em;
}
</style>

<style lang="scss">
.card#article {

    h1,
    h2,
    h3,
    h4 {
        text-align: center;
        text-indent: 0;
    }
}
</style>