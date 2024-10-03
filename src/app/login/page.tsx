'use client'

import { useAtom, useSetAtom } from 'jotai/index'
import { emailAtom, passwordAtom } from '~/app/atoms/registration'
import { tokenAtom, userAtom } from '~/app/atoms/session'
import { useRouter } from 'next/navigation'
import { api } from '~/trpc/react'
import type { ChangeEvent, FormEvent } from 'react'

export default function LoginPage() {
    const [email, setEmail] = useAtom(emailAtom)
    const [password, setPassword] = useAtom(passwordAtom)
    const setUser = useSetAtom(userAtom)
    const setToken = useSetAtom(tokenAtom)
    const router = useRouter()

    const loginMutation = api.auth.login.useMutation()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const login = await loginMutation.mutateAsync({
                email,
                password,
            })
            setToken(login.token)
            setUser(login.user)
            router.replace('/dashboard')
            console.log('Login successful')
        } catch (error) {
            console.error('Login failed', error)
        }
    }

    return (
        <form className='card-body gap-4' onSubmit={handleSubmit}>
            <Input
                label='Email'
                name='email'
                type='email'
                onChange={setEmail}
                value={email}
            />
            <Input
                label='Password'
                name='password'
                type='password'
                onChange={setPassword}
                value={password}
            />
            <input className='btn btn-primary' type='submit' value='Sign in' />
        </form>
    )
}

type InputProps = {
    label: string
    name: string
    type: string
    onChange: (value: string) => void
    value: string
}

const Input = (props: InputProps): JSX.Element => {
    const { label, name, type, onChange, value } = props
    return (
        <div className='flex flex-col'>
            <label className='label' htmlFor={name}>
                {label}
            </label>
            <input
                className='input'
                name={name}
                type={type}
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                    onChange(e.target.value)
                }
                value={value}
                required
            />
        </div>
    )
}
