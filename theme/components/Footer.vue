<template>
    <footer>
        <div>Copyright &copy; 2020~2026 Wankupi</div>
        <div>个人博客 | 我说我是乱写</div>
        <div>站内文章采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode" target="_blank"
                rel="noopener noreferrer" class="license">CC BY-NC-SA 4.0 知识共享公共许可协议</a></div>
    </footer>
</template>

<style scoped>
footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    backdrop-filter: blur(20px) grayscale(0.5);
    background-color: rgb(from var(--card-bg-color) r g b / 0.5);
    font-size: small;
    color: var(--text-color);
    min-height: var(--footer-height);
    padding: 2rem 0;
}
</style>