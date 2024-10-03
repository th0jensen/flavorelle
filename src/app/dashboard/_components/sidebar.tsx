import Link from 'next/link'

export default function Sidebar() {
    return (
        <div className='sidebar sticky flex h-full w-16 flex-col items-center justify-between overflow-hidden bg-gray-800 text-white'>
            <div>
                <AddButton />
            </div>
        </div>
    )
}

const AddButton = () => {
    return (
        <Link href='/dashboard/add'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600'>
                <span className='text-2xl'>+</span>
            </div>
        </Link>
    )
}
