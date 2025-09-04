import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "src"),
        },
    },
    root: path.resolve(import.meta.dirname),
    build: {
        outDir: path.resolve(import.meta.dirname, "dist"),
        emptyOutDir: true,
    },
    server: {
        port: 3000,
        host: true,
        fs: {
            strict: true,
            deny: ["**/.*"],
        },
    },
    preview: {
        port: 3000,
        host: true,
    },
});
