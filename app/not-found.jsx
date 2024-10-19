import Link from 'next/link'

function NotFounds() {
    return (
        <div className='min-h-screen py-12'>
            <div className="container min-h-screen px-4 text-center grid place-items-center">
                <div className='notfound'>
                    <img src="/images/404 error.png" width={350} className='mx-auto' alt="404 Error" />
                    <h2 className='text-7xl max-md:text-3xl font-bold mt-4'>Page Not Found</h2>
                    <p className='text-neutral-400 mt-2'>Opps, The page you are trying to reach is not found.</p>
                    <Link href="/" className='main-btn block mt-5 px-5 w-fit mx-auto text-nowrap'>Return Home</Link>
                </div>
            </div>
        </div>
    )
}

export default NotFounds