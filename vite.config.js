import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //trois ligne pour IDE sinon cela ne fonctionne pas
  //  server: {
  //   port: 9000,
  //   host: "0.0.0.0"
  //   },
});
