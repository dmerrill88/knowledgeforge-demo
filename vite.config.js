import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
```

**`.replit`:**
```
language = "nodejs"
run = "npm run dev"
entrypoint = "index.html"

[nix]
channel = "stable-22_11"