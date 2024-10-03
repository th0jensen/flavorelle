'use client'

import { useEffect } from 'react'
import { userAtom } from '~/app/atoms/session'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'

export default function Home() {
    const user = useAtomValue(userAtom)
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.replace('/login')
        }
        if (user) {
            router.replace('/dashboard')
        }
    })

    return (
        <div className='flex min-h-screen flex-col items-center justify-center'>
            <p>Loading...</p>
        </div>
    )
}
