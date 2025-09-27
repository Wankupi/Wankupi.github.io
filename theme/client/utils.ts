import { useData } from "vitepress";

export function usePageFrontmatter<T>(): T {
  return useData().frontmatter as any as T;
}
