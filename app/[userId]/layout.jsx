'use client'
import { Icon } from "@iconify/react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import Loader from '../components/Loader'
import { usePathname, useRouter, } from "next/navigation"
import { logout } from "../store/slices/usersSlice"
import { useEffect, useRef } from "react"

function UserLayout({ children }) {
    const { user } = useSelector(state => state.users)
    const pathname = usePathname()
    const router = useRouter()
    const progressBar = useRef(null)
    const dispatch = useDispatch()

    const userProfilePercentage = () => {
        if (user) {
            const totalKeys = Object.keys(user).length
            let counter = 0            
            for (let key in user) user[key] !== '' && counter++ 
            return Math.trunc((counter/totalKeys) * 100)
        } else return 0
    }

    const userLogout = () => {
        dispatch(logout())
        router.push("/")
    }

    useEffect(() => {
        if (user) progressBar.current.style.width = `${userProfilePercentage()}%`
    }, [user, progressBar])
    
    return (
        <div className='min-h-screen py-32'>
            {
                user ?
                    <div className="container px-4 flex items-stretch gap-5 max-md:flex-col">
                        <aside className='w-1/3 max-md:w-full rounded-lg shadow-md bg-white p-4 border flex flex-col gap-5'>
                            <div className="profile-completion border p-3 px-3 rounded-lg flex items-center gap-2">
                                <img src={user.avatar} className="w-12 h-12 rounded-full" alt="User avatar" />
                                <div className="flex-1 overflow-hidden truncate">
                                    <span className="text-sm truncate">{user.first_name} {user.last_name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="progress-bar block relative h-1 w-full rounded-full bg-neutral-200">
                                            <span ref={progressBar} className="progress transition-all ease-in-out block h-full w-0 rounded-full bg-green-400"></span>
                                        </span>
                                        <span className="percentage text-sm">{userProfilePercentage()}%</span>
                                    </div>
                                </div>
                            </div>
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