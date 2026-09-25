import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'pdf-attachment-header',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && (req.url.endsWith('.pdf') || req.url.includes('.pdf?'))) {
            res.setHeader('Content-Disposition', 'attachment; filename="CVNAVEENKARANRS.pdf"');
            res.setHeader('Content-Type', 'application/pdf');
          }
          next();
        });
      },
    },
  ],
})
