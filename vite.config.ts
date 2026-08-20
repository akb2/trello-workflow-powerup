import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/trello-workflow-powerup/",

  build: {
    rollupOptions: {
      input: {
        cardBackSection: fileURLToPath(new URL("./card-back-section.html", import.meta.url)),
        workflow: fileURLToPath(new URL("./workflow.html", import.meta.url)),
      },
    },
  },
});