import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// viteSingleFile: emits dist/index.html with JS, CSS and images inlined —
// a fully self-contained build (used by the app's static Preview server).
// Regular `npm run dev` / `npm run build` behavior is otherwise unchanged.
export default defineConfig({
  root: import.meta.dirname,
  plugins: [viteSingleFile()],
});
