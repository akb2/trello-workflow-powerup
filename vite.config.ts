import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/trello-workflow-powerup/",

  build: {
    rollupOptions: {
      input: {
        cardBackSection: fileURLToPath(new URL("./src/pages/card-back-section/index.html", import.meta.url)),
        workflow: fileURLToPath(new URL("./src/pages/workflow/index.html", import.meta.url)),
        showSettings: fileURLToPath(new URL("./src/pages/show-settings/index.html", import.meta.url)),
      },
    },
  },
});