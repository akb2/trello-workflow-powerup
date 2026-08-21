import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/trello-workflow-powerup/",

  build: {
    rollupOptions: {
      input: {
        connectors: fileURLToPath(new URL("./index.html", import.meta.url)),
        workflow: fileURLToPath(new URL("./src/pages/workflow/index.html", import.meta.url)),
        settings: fileURLToPath(new URL("./src/pages/settings/index.html", import.meta.url)),
      },
    },
  },
});