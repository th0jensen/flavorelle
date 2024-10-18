import Sidebar from '~/app/dashboard/_components/Sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='flex h-full w-full'>
            <div className='fixed bottom-0 z-30 h-16 w-full md:top-16 md:flex md:h-full md:w-32 md:justify-around'>
                <Sidebar />
            </div>
            <div className='w-full overflow-y-auto md:pl-32'>{children}</div>
        </div>
    )
}
