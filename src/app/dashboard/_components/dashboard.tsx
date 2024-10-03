import { userAtom } from '~/app/atoms/session'
import { useAtomValue } from 'jotai'
import Link from 'next/link'

export default function Dashboard() {
    const user = useAtomValue(userAtom)

    return (
        <div>
            <div className='fixed left-4 top-20 z-30 w-screen'>
                <AddButton />
            </div>
            <div className='flex h-screen items-center justify-center'>
                <p>Hello {user && `${user.firstName} ${user.lastName}`} </p>
            </div>
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
