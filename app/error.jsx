'use client'; 
export default function Error({ error, reset }) {

    return (
        <div className='min-h-screen py-12'>
            <div className="container min-h-screen px-4 text-center grid place-items-center">
                <div className='notfound'>
                    <img src="/images/500 Internal Server Error.png" width={400} className='mx-auto' alt="500 internal server Error" />
                    <p className='mt-2 text-xl'>Something went wrong with our servers, we will fix it as soon as possible.</p>
                </div>
            </div>
        </div>
    );
}
