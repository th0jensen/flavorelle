import { atomWithStorage } from 'jotai/utils'

export type User = {
    id: number
    email: string
    firstName: string
    lastName: string
}

export const tokenAtom = atomWithStorage<string | undefined>('token', '')
export const userAtom = atomWithStorage<User | undefined>('user', undefined)
