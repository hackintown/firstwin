import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      disable: process.env.NODE_ENV === "development", // Disable PWA in development
      registerType: "autoUpdate", // Automatically update the PWA when a new version is available
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"], // Additional assets
      manifest: {
        name: "First Win Color Prediction",
        short_name: "First Win",
        description: "Color Prediction Betting App",
        theme_color: "#ffffff",
        background_color: "#000000",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      strategies: "generateSW", // Use GenerateSW strategy for automatic service worker
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}"],
        navigateFallback: "/index.html",
        navigateFallbackAllowlist: [/^(?!\/__).*/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.yourbackend\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 10,
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === "script" ||
              request.destination === "style",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-resources",
            },
          },
        ],
      },
      devOptions: {
        enabled: true, // Enable service worker in development for testing
        type: "module",
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Proxy API requests to backend
        changeOrigin: true,
        secure: false,
      },
    },
    historyApiFallback: true,
  },
  build: {
    chunkSizeWarningLimit: 600, // Increase chunk size limit
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"], // Separate vendor libraries into their own chunk
        },
      },
    },
  },
  preview: {
    port: 5173,
    strictPort: true,
    historyApiFallback: true,
  },
});
