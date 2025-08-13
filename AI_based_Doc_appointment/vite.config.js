import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'



// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  theme:{
    extends:{
      colors:{
        'primary' : "#5f6fff"
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill,minmax(200px,1fr))'
      }
    },
  },
  server:{port:5173},
   
})
