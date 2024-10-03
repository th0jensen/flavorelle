import Link from 'next/link'
import {
    AddSquareIcon,
    Home03Icon,
    Tag02Icon,
    VegetarianFoodIcon,
    WindTurbineIcon,
} from 'hugeicons-react'

export default function Sidebar() {
    return (
        <div className='sidebar sticky flex h-16 w-full items-center justify-center gap-4 overflow-hidden bg-gray-800 py-4 text-white md:h-full md:w-16 md:flex-col md:justify-start'>
            <HomeButton />
            <AddButton />
            <RouletteButton />
            <IngredientsButton />
            <TagButton />
        </div>
    )
}

const AddButton = () => {
    return (
        <Link href='/dashboard/add'>
            <div className='btn-ghost flex h-10 w-10 items-center justify-center rounded-full'>
                <span className='text-2xl'>
                    <AddSquareIcon />
                </span>
            </div>
        </Link>
    )
}

const HomeButton = () => {
    return (
        <Link href='/dashboard'>
            <div className='btn-ghost flex h-10 w-10 items-center justify-center rounded-full'>
                <span className='text-2xl'>
                    <Home03Icon />
                </span>
            </div>
        </Link>
    )
}

const RouletteButton = () => {
    return (
        <Link href='/dashboard'>
            <div className='btn-ghost flex h-10 w-10 items-center justify-center rounded-full'>
                <span className='text-2xl'>
                    <WindTurbineIcon />
                </span>
            </div>
        </Link>
    )
}

const IngredientsButton = () => {
    return (
        <Link href='/dashboard'>
            <div className='btn-ghost flex h-10 w-10 items-center justify-center rounded-full'>
                <span className='text-2xl'>
                    <VegetarianFoodIcon />
                </span>
            </div>
        </Link>
    )
}

const TagButton = () => {
    return (
        <Link href='/dashboard'>
            <div className='btn-ghost flex h-10 w-10 items-center justify-center rounded-full'>
                <span className='text-2xl'>
                    <Tag02Icon />
                </span>
            </div>
        </Link>
    )
}
