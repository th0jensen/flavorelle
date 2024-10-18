import Link from 'next/link'
import {
    AddSquareIcon,
    Home03Icon,
    Tag02Icon,
    VegetarianFoodIcon,
    WindTurbineIcon,
} from 'hugeicons-react'

const sidebarButtons: SidebarButtonProps[] = [
    {
        label: "Home",
        href: "/dashboard",
        icon: <Home03Icon />
    }, {
        label: "Add",
        href: "/dashboard/add",
        icon: <AddSquareIcon />
    }, {
        label: "Spin",
        href: "/dashboard/spin",
        icon: <WindTurbineIcon />
    }
]

export default function Sidebar() {
    return (
        <div className='sidebar sticky flex h-16 w-full items-center justify-center gap-4 overflow-hidden bg-gray-800 py-4 text-white md:h-full hover:md:w-32 md:flex-col md:justify-start'>
            {sidebarButtons.map((button, index) => (
                <div key={index}>
                    <SidebarButton label={button.label} href={button.href} icon={button.icon} />
                </div>
            ))}
        </div>
    )
}

interface SidebarButtonProps {
    label: string,
    href: string,
    icon: React.ReactNode
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
    label, href, icon
}) => {
    return (
        <Link href={`${href}`}>
            <div className='btn-ghost flex h-10 w-10 md:w-28 items-center justify-start px-4 rounded-full gap-2'>
                <span className='text-2xl'>
                    {icon}
                </span>
                <p className='text-sm font-light hidden md:block'>{label}</p>
            </div>
        </Link>
    )
}
