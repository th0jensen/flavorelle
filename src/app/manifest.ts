import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Flavorelle',
        short_name: 'Flavorelle',
        description: 'A self-hostable recipe manager app made in T3!',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: '/192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/256x256.png',
                sizes: '256x256',
                type: 'image/png',
            },
        ],
    }
}
