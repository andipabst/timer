import {defineConfig} from 'vite'
import preact from '@preact/preset-vite'
import {VitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        preact(),
        VitePWA({
            includeAssets: ['images/favicon.svg'],
            manifest: {
                id: '/',
                name: 'Timer',
                short_name: 'Timer',
                description: 'Timer',
                theme_color: '#ba1200',
                display: 'standalone',
                icons: [
                    {
                        "src": "/icons-vector.svg",
                        "type": "image/svg+xml",
                        "sizes": "512x512"
                    }
                ]
            }
        })
    ]
})
