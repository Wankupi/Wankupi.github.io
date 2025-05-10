import type { InjectionKey } from "vue";
import type { Page } from "vuepress";

export const all_pages_key = Symbol("all_pages") as InjectionKey<Page[]>;
