import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { execSync } from "child_process";

const commitId = execSync("git rev-parse --short HEAD").toString().trim();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __GIT_COMMIT__: JSON.stringify(commitId),
  },
});
