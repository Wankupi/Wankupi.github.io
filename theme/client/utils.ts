import { useData } from "vitepress";
import type { Ref } from "vue";

export function usePageFrontmatter<T>(): Ref<T> {
  return useData().frontmatter as any as Ref<T>;
}
