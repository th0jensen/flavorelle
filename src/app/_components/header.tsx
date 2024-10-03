'use client'

import { useAtomValue } from 'jotai'
import { type User, userAtom } from '~/app/atoms/session'

export default function Header() {
    const user = useAtomValue(userAtom)

    return (
        <header className='navbar sticky top-0 z-20 flex h-12 w-screen bg-base-300'>
            <div className='navbar-start'>
                <h1 className='px-4 text-xl font-medium'>Flavorelle</h1>
            </div>
            <div className='fixed right-4'>
                <div className='btn btn-primary h-6 w-12 rounded-full'>
                    {user && <ProfilePicture user={user} />}
                </div>
            </div>
        </header>
    )
}

function ProfilePicture({ user }: { user: User }) {
    const initials: string =
        user.firstName[0]!.toUpperCase() + user.lastName[0]!.toUpperCase()
    return (
        <div className='flex h-4 w-4 flex-col items-center justify-center gap-2 rounded-full'>
            <p className='text-xl'>{initials}</p>
        </div>
    )
}
