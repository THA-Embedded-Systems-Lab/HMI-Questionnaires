import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Unmount React trees between tests so the DOM stays isolated.
afterEach(() => {
  cleanup();
});

// jsdom's opaque-origin document exposes no usable localStorage; ThemeProvider
// reads it. Install a self-contained in-memory Storage, shadowing any
// (experimental) Node global so it is never touched.
const store = new Map<string, string>();
const localStorageMock: Storage = {
  getItem: (key) => (store.has(key) ? store.get(key)! : null),
  setItem: (key, value) => void store.set(key, String(value)),
  removeItem: (key) => void store.delete(key),
  clear: () => store.clear(),
  key: (index) => Array.from(store.keys())[index] ?? null,
  get length() {
    return store.size;
  },
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  configurable: true,
  writable: true,
});

// jsdom has no matchMedia; ThemeProvider needs it. Default: light mode.
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}
