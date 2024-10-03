'use client'

import { useEffect } from 'react'
import { userAtom } from '~/app/atoms/session'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import { Riple } from 'react-loading-indicators'

export default function Home() {
    const user = useAtomValue(userAtom)
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
        if (user) {
            router.push('/dashboard')
        }
    })

    return (
        <div className='flex h-full w-full items-center justify-center'>
            <Riple color='white' size='medium' />
        </div>
    )
}
