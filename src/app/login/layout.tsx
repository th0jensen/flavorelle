export default function LoginLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='flex h-full w-full items-center justify-center'>
            <div className='card w-96 bg-base-300 p-12'>
                <h1 className='card-title justify-center'>Login</h1>
                {children}
            </div>
        </div>
    )
}
