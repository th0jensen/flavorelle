'use client'

import { tokenAtom, userAtom } from '~/app/atoms/session'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Dashboard() {
    const user = useAtomValue(userAtom)!
    const setUser = useSetAtom(userAtom)
    const [token, setToken] = useAtom(tokenAtom)
    const router = useRouter()

    useEffect(() => {
        const lsToken: string = localStorage.getItem('token')!
        const lsUser: string = localStorage.getItem('user')!

        const tokenCheck: boolean = lsToken === 'undefined' || !lsToken
        const userCheck: boolean = lsUser === 'undefined' || !lsUser

        if (tokenCheck || userCheck) {
            setToken(undefined)
            setUser(undefined)
            router.replace('/login')
        }
    }, [router, setToken, setUser, token, user])

    return (
        <div className='flex h-screen items-center justify-center'>
            <p>Hello {user && `${user.firstName} ${user.lastName}`} </p>
        </div>
    )
}

const AddButton = () => {
    return (
        <div>
            <Link className='btn btn-primary' href='/dashboard/add'>
                + add new
            </Link>
        </div>
    )
}
