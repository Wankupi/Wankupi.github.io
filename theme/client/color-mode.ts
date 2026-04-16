import { ref } from "vue";

export type ColorMode = "auto" | "light" | "dark";

const STORAGE_KEY = "vitepress-theme-appearance";

export const colorMode = ref<ColorMode>("auto");
let initialized = false;

function isColorMode(value: string | null): value is ColorMode {
  return value === "auto" || value === "light" || value === "dark";
}

function getPreferredMode(): Exclude<ColorMode, "auto"> {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function persistColorMode(mode: ColorMode) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, mode);
}

export function initColorMode() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  const savedMode = window.localStorage.getItem(STORAGE_KEY);
  if (isColorMode(savedMode)) colorMode.value = savedMode;
}

function setColorMode(mode: ColorMode) {
  colorMode.value = mode;
  persistColorMode(mode);
}

export function toggleColorMode() {
  const currentMode = colorMode.value === "auto" ? getPreferredMode() : colorMode.value;
  const nextMode = currentMode === "dark" ? "light" : "dark";

  setColorMode(nextMode === getPreferredMode() ? "auto" : nextMode);
}
