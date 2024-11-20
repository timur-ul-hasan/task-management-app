import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }): object => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    resolve: {
      alias: {
        src: path.resolve(__dirname, "./src"),
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    plugins: [react()],
    server: {
      port: 3000,
    },
  };
});
