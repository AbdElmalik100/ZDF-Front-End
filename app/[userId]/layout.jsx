'use client'
import { Icon } from "@iconify/react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import Loader from '../components/Loader'
import { usePathname, useRouter, } from "next/navigation"
import { logout } from "../store/slices/usersSlice"

function UserLayout({ children }) {
    const { user } = useSelector(state => state.users)
    const pathname = usePathname()
    const router = useRouter()
    const dispatch = useDispatch()


    const userLogout = () => {
        dispatch(logout())
        router.push("/")
    }
    return (
        <div className='min-h-screen py-32'>
            {
                user ?
                    <div className="container px-4 flex items-stretch gap-5 max-md:flex-col">
                        <aside className='w-1/3 max-md:w-full rounded-lg shadow-md bg-white p-4 border flex flex-col gap-5'>
                            <ul className="links flex flex-col gap-2">
                                <li>
                                    <Link href={`/${user._id}/subscriptions`} className={`flex items-center gap-2 p-2 px-3 rounded-lg transition-all ease-in-out hover:bg-neutral-50 ${pathname.includes("subscriptions") ? 'text-white bg-sky-400' : ''}`}>
                                        <Icon icon='streamline:subscription-cashflow' fontSize={20} />
                                        <span>Subscriptions</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/${user._id}/profile`} className={`flex items-center gap-2 p-2 px-3 rounded-lg transition-all ease-in-out hover:bg-neutral-50 ${pathname.includes("profile") ? 'text-white bg-sky-400 hover:bg-sky-400' : ''}`}>
                                        <Icon icon='material-symbols:person' fontSize={20} />
                                        <span>Profile</span>
                                    </Link>
                                </li>
                            </ul>
                            <button className='flex p-2 px-3 rounded-lg text-rose-700 transition-all ease-in-out hover:bg-rose-50 w-full items-center gap-2 mt-auto'
                                onClick={userLogout}>
                                <Icon icon='hugeicons:logout-04' fontSize={20} />
                                <span>Logout</span>
                            </button>
                        </aside>
                        {children}
                    </div>
                    :
                    <Loader></Loader>
            }
        </div>
    )
}

export default UserLayout