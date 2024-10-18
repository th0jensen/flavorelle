'use client'

import { tokenAtom, userAtom } from '~/app/atoms/session'
import { useAtom, useSetAtom } from 'jotai/index'
import { displayMenuAtom } from '~/app/atoms/header'
import { useRouter } from 'next/navigation'
import { Logout03Icon, Settings01Icon, UserIcon } from 'hugeicons-react'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
    const [displayMenu, setDisplayMenu] = useAtom(displayMenuAtom)
    const [user, setUser] = useAtom(userAtom)
    const setToken = useSetAtom(tokenAtom)
    const router = useRouter()

    const handleLogout = () => {
        setDisplayMenu(false)
        setUser(undefined)
        setToken(undefined)
        router.replace('/login')
    }

    const handleSettings = () => {
        setDisplayMenu(false)
        router.replace('/settings')
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (displayMenu) {
                const menu = document.querySelector('.menu')
                const profileButton = document.querySelector('.btn-primary')
                if (
                    menu &&
                    !menu.contains(event.target as Node) &&
                    !profileButton?.contains(event.target as Node)
                ) {
                    setDisplayMenu(false)
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [displayMenu, setDisplayMenu])

    return (
        <header className='navbar fixed top-0 z-50 flex h-12 w-screen bg-base-300'>
            <Link className='navbar-start' href='/dashboard'>
                <h1 className='px-4 text-xl font-medium'>Flavorelle</h1>
            </Link>
            <div className='fixed right-4'>
                <button
                    className='btn btn-primary h-6 w-12 rounded-full'
                    onClick={() => setDisplayMenu(!displayMenu)}
                >
                    <p className='text-xl'>
                        {user ? (
                            `${user.firstName[0]!.toUpperCase() + user.lastName[0]!.toUpperCase()}`
                        ) : (
                            <UserIcon />
                        )}
                    </p>
                </button>
                {displayMenu && user && (
                    <div className='menu fixed right-2 top-[4.5rem] z-50 flex w-48 flex-col items-center rounded-2xl bg-gray-800 p-4 shadow-lg'>
                        <p className='mb-4 text-center text-lg font-semibold'>
                            {user.firstName} {user.lastName}
                        </p>
                        <button
                            className='btn btn-disabled mb-2 flex w-full items-center gap-2'
                            onClick={handleSettings}
                        >
                            <Settings01Icon />
                            <span className='flex-grow text-left'>
                                Settings
                            </span>
                        </button>
                        <button
                            className='btn mb-2 flex w-full items-center gap-2 hover:btn-error'
                            onClick={handleLogout}
                        >
                            <Logout03Icon />
                            <span className='flex-grow text-left'>Logout</span>
                        </button>
                    </div>
                )}
            </div>
        </header>
    )
}
