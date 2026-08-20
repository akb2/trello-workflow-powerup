import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/trello-powerups/",

  build: {
    rollupOptions: {
      input: {
        buttonsFilter: fileURLToPath(new URL("./buttons-filter.html", import.meta.url),),
      },
    },
  },
});