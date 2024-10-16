function Loader() {
    return (
        <div className='min-h-screen grid place-items-center fixed bg-black/50 w-full h-full top-0 left-0 z-[99999999999]'>
            <svg className='spinner' viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
            </svg>
        </div>
    )
}

export default Loader