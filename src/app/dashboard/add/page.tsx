import { type FormEvent } from 'react'
import Link from 'next/link'

export default function AddView() {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <div className='flex'>
            <CloseButton />
        </div>
    )
}

const CloseButton = () => {
    return (
        <div>
            <Link className='btn btn-ghost' href='/dashboard'>
                {`<-`}
            </Link>
        </div>
    )
}
