export default function LoginLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='flex h-auto items-center justify-center'>
            <div className='absolute top-[25vh] card h-[50vh] w-96 bg-base-300 p-12 flex items-center'>
                <h1 className='card-title justify-center'>Login</h1>
                {children}
            </div>
        </div>
    )
}
