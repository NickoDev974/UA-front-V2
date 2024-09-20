import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: " https://github.com/NickoDev974/UA-front-V2.git ",
  //trois ligne pour IDE sinon cela ne fonctionne pas
  //  server: {
  //   port: 9000,
  //   host: "0.0.0.0"
  //   },
});
