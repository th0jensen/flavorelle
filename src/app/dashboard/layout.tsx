import Sidebar from '~/app/dashboard/_components/sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='flex h-full w-full overflow-hidden'>
            <div className='w-16'>
                <Sidebar />
            </div>
            <div className='h-full w-full flex-1 overflow-hidden'>
                {children}
            </div>
        </div>
    )
}
