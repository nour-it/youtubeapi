import { defineConfig } from "vite"

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  return {
    plugins: [],
    build: {
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
      outDir: 'dist',
      sourcemap: true,
      minify: 'esbuild',
      lib: {
        entry: 'index.js', 
      },
      rollupOptions: {
        external: /^(@babel\/runtime|core-js)/, 
        output: [
          {
            entryFileNames: "index.js",
            format: "es",
          },
          {
            entryFileNames: "index.cjs",
            format: "cjs",
          }
        ]
      }
    }
  }
})