<script setup lang="ts">
import { useClientData, usePageFrontmatter } from 'vuepress/client'

const {
    pageData,
    pageFrontmatter,
    pageHead,
    pageHeadTitle,
    pageLang,
    routeLocale,
    siteData,
    siteLocaleData,
} = useClientData()
</script>

<template>
    <div>usePageFrontmatter: {{ usePageFrontmatter() }}</div>
    <div>
        Hello, This is the base layout.
    </div>
    <div>pageData: {{ pageData }}</div>
    <div>pageFrontmatter: {{ pageFrontmatter }}</div>
    <div>pageHead: {{ pageHead }}</div>
    <div>pageHeadTitle: {{ pageHeadTitle }}</div>
    <div>pageLang: {{ pageLang }}</div>
    <div>routeLocale: {{ routeLocale }}</div>
    <div>siteData: {{ siteData }}</div>
    <div>siteLocaleData: {{ siteLocaleData }}</div>
    <Content />
</template>
