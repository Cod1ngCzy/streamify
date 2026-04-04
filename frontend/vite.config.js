import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // allow access from other devices
    port: 5173,
    hmr: {
      clientPort: 5173
    },
    // Allowed Host
    allowedHosts: ['https://4fc1-112-206-104-230.ngrok-free.app'],
    
    // Vite Proxy for Outside Network Debugging
    // Not recommended for production, use nginx
    // ❌ If planning to remove proxy, change axios to baseURL: "http://<your-ip>:5001/api/v1"
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})