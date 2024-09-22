import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/UA-front-V2/",
  assetsInclude: [
    "**/*.jpg",
    "**/*.jpeg",
    "**/*.png",
    "**/*.gif",
    "**/*.svg",
    "**/*.JPG",
  ],
});
