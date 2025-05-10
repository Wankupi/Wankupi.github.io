<script setup lang="ts">
import ContactMe from './ContactMe.vue';
import SideCard from './SideCard.vue';
import { onMounted, ref } from 'vue';
import { get_plan } from '../client/leancloud';

let messages = ref<string[]>([]);
let hitokoto = ref<string>("");

function load_hitokoto() {
    fetch("https://v1.hitokoto.cn/").then(response => response.json())
        .then(function (myJson) {
            hitokoto.value = myJson.hitokoto;
        });
}

function load_messages() {
    get_plan().then(
        (res) => res.results
    ).then(
        (res: { weight: number, text: string, createdAt: string }[]) => {
            return res.sort((a, b) => {
                return a.weight == b.weight ? (a.createdAt < b.createdAt ? 1 : -1) : (b.weight - a.weight);
            }).map(x => x.text)
        }
    ).then((r) => {
        messages.value = r;
    })
}

onMounted(load_hitokoto);
onMounted(load_messages);

</script>

<template>
    <nav class="side">
        <slot name="up"></slot>
        <SideCard v-if="hitokoto.length > 0">
            <h3>一言</h3>
            <i>{{ hitokoto }}</i>
        </SideCard>
        <SideCard v-if="messages.length > 0">
            <h3>公告 & 计划</h3>
            <div v-for:="msg in messages">{{ msg }}</div>
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