import { defineConfig } from "vite";
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  resolve: {
    alias: [{ find: "~", replacement: path.resolve(__dirname, "src") }]
  }
});
