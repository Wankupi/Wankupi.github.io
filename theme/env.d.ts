declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "@localSearchIndex" {
  const data: Record<string, () => Promise<{ default: string }>>;
  export default data;
}
