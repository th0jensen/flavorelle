'use client'

import { tokenAtom, userAtom } from '~/app/atoms/session'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import RecipeList from '~/app/dashboard/_components/RecipeList'

export default function Dashboard() {
    const [user, setUser] = useAtom(userAtom)
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
            router.push('/login')
        }
    }, [router, setToken, setUser, token, user])

    return (
        <div className='p-4'>
            <RecipeList />
        </div>
    )
}
