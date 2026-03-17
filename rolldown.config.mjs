import { defineConfig } from "rolldown";

export default defineConfig({
  input: {
    index: "src/index.ts",
  },
  external: ["@babel/core", "sweb-jsx", "vite"],
  output: {
    dir: "dist",
    format: "esm",
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: "src",
    entryFileNames: "[name].js",
  },
});
