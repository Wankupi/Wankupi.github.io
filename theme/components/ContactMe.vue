<script setup lang="ts">
import SideCard from './SideCard.vue';
</script>

<template>
    <SideCard class="contact-me">
        <a href="mailto:KunpengWang@sjtu.edu.cn" title="email" target="_blank" rel="noopener noreferrer"><img
                alt="image" src="/static/images/social-media/mail.png"></a>
        <a href="https://wpa.qq.com/msgrd?v=3&uin=2893353848&site=qq&menu=yes" title="qq" target="_blank"
            rel="noopener noreferrer"><img alt="QQ" src="/static/images/social-media/qq.png"></a>
        <a href="https://github.com/Wankupi" title="github" target="_blank" rel="noopener noreferrer"><img alt="github"
                src="/static/images/social-media/github.png"></a>
        <a href="https://codeforces.com/profile/Wankupi" title="codeforces" target="_blank"
            rel="noopener noreferrer"><img alt="codeforces" src="/static/images/social-media/codeforces.png"></a>
        <a href="https://www.luogu.com.cn/user/128771" title="luogu" target="_blank" rel="noopener noreferrer"><img
                alt="luogu" src="/static/images/social-media/luogu.ico"></a>
    </SideCard>
</template>

<style>
.contact-me {
    display: flex;
    justify-content: space-around;
}

.contact-me img {
    width: 1.5rem;
    height: 1.5rem;
    transition: linear 0.2s;
}

.contact-me img:hover {
    box-shadow: 0 0 3px black;
}
</style>