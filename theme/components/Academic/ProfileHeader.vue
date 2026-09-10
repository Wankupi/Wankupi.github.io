<script setup lang="ts">
import { usePageFrontmatter } from "@/client/utils";
import { Icon } from "@iconify/vue";
import { useData, withBase } from "vitepress";
import { computed } from "vue";

const frontmatter = usePageFrontmatter<{
  photo: string | null;
  cv: string;
  github: string;
  orcid?: string;
  emails: string[];
  location: string[] | null;
}>();

const { page } = useData();

/* The name is the page title, which VitePress takes from the leading <h1>.
   The layout hides that <h1> whenever this header shows the name instead. */
const name = computed(() => page.value.title ?? "");

const links = computed(() => {
  const items: { icon: string; label: string; href: string }[] = [];
  if (frontmatter.value.cv) {
    items.push({ icon: "academicons:cv", label: "CV", href: withBase(frontmatter.value.cv) });
  }
  if (frontmatter.value.github) {
    items.push({
      icon: "mdi:github",
      label: "GitHub",
      href: `https://github.com/${frontmatter.value.github}`
    });
  }
  if (frontmatter.value.orcid) {
    items.push({
      icon: "academicons:orcid",
      label: "ORCID",
      href: `https://orcid.org/${frontmatter.value.orcid}`
    });
  }
  return items;
});

const emails = computed(() => frontmatter.value.emails ?? []);
const locations = computed(() => frontmatter.value.location ?? []);
</script>

<template>
  <header class="hero">
    <img v-if="frontmatter.photo" class="photo" :src="withBase(frontmatter.photo)" :alt="name" />

    <h1 v-if="name" class="name">{{ name }}</h1>

    <div v-if="links.length" class="links">
      <a
        v-for="link in links"
        :key="link.label"
        class="pill"
        :href="link.href"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon :icon="link.icon" width="1.15em" />
        <span>{{ link.label }}</span>
      </a>
    </div>

    <dl v-if="emails.length || locations.length" class="contacts">
      <template v-for="email in emails" :key="email">
        <dt><Icon icon="mdi:email-outline" width="1.1em" /><span class="sr-only">邮箱</span></dt>
        <dd><a :href="`mailto:${email}`">{{ email }}</a></dd>
      </template>
      <template v-for="location in locations" :key="location">
        <dt>
          <Icon icon="tdesign:location-filled" width="1.1em" /><span class="sr-only">地址</span>
        </dt>
        <dd>{{ location }}</dd>
      </template>
    </dl>
  </header>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid color-mix(in srgb, var(--text-color) 15%, transparent);
}

.photo {
  width: 7.5rem;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme-color) 35%, transparent);
}

.hero .name {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
  margin: 0;
}

.links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

/* Labelled buttons: on a phone an icon alone leaves the reader guessing */
.hero .links .pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  min-height: 2.25rem;
  padding: 0.35em 0.9em;
  font-size: 0.95rem;
  color: var(--text-color);
  text-decoration: none;
  border: 1px solid color-mix(in srgb, var(--theme-color) 45%, transparent);
  border-radius: 999px;
  background-color: color-mix(in srgb, var(--theme-color) 8%, transparent);
  transition:
    background-color 0.2s,
    border-color 0.2s;
}

.hero .links .pill:active {
  background-color: color-mix(in srgb, var(--theme-color) 20%, transparent);
  border-color: var(--theme-color);
}

.hero .links .pill > svg {
  color: var(--theme-color);
}

.contacts {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  justify-content: center;
  column-gap: 0.5em;
  row-gap: 0.3rem;
  margin: 0;
  font-size: 0.95rem;
}

.contacts dt {
  display: flex;
  align-items: center;
  color: var(--theme-color);
}

.contacts dd {
  margin: 0;
  text-align: start;
  overflow-wrap: anywhere;
}

.hero .contacts dd a {
  color: var(--text-color);
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--theme-color) 60%, transparent);
  text-underline-offset: 0.2em;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
</style>
