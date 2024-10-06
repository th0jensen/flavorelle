import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import daisyui from 'daisyui'

export default {
    content: ['./src/**/*.tsx'],
    variants: {
        extend: {
            display: ['group-hover'],
        },
    },
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-geist-sans)', ...fontFamily.sans],
            },
        },
    },
    plugins: [daisyui],
} satisfies Config
