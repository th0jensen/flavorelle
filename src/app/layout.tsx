import '~/styles/globals.css'

import { GeistSans } from 'geist/font/sans'
import { type Metadata } from 'next'

import { TRPCReactProvider } from '~/trpc/react'
import Header from './_components/Header'

export const metadata: Metadata = {
    title: 'Flavorelle',
    description: 'A self-hostable recipe manager app made in T3!',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang='en' className={`${GeistSans.variable}`}>
            <body>
                <TRPCReactProvider>
                    <main className='h-screen items-center justify-center'>
                        <Header />
                        <div className='pt-16'>{children}</div>
                    </main>
                </TRPCReactProvider>
            </body>
        </html>
    )
}
