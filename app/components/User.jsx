'use client'
import { Icon } from "@iconify/react/dist/iconify.js"
import { useClickAway } from "@uidotdev/usehooks"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AnimatePresence, motion } from 'framer-motion'
import { logout } from "../store/slices/usersSlice"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"


function User() {
    const dispatch = useDispatch()
    const router = useRouter()
    const pathname = usePathname()
    const user = useSelector(state => state.users.user)
    const [openMenu, setOpenMenu] = useState(false)
    const ref = useClickAway(() => {
        setOpenMenu(false)
    })
    
    

    const userLogout = () => {
        dispatch(logout())
        if(pathname.includes("profile") || pathname.includes("subscriptions")) router.push("/")
    }

    return (
        user &&
        <div ref={ref} className="user-item relative">
            <div className="profile-picture" onClick={() => setOpenMenu(prevVal => !prevVal)}>
                <img className="object-cover cursor-pointer w-10 h-10 rounded-full border border-transparent transition-all ease-in-out hover:border-sky-400" src={user.avatar} alt={user.first_name} />
            </div>
            <AnimatePresence>
                {
                    openMenu &&
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ ease: 'easeOut', duration: 0.1 }}
                        className="menu bg-white absolute top-12 right-0 rounded-2xl shadow-lg border p-2 flex flex-col w-[225px] gap-2"
                    >
                        <div className="mb-2 pb-4 border-b flex items-center p-2 gap-2">
                            <img src={user.avatar} className="rounded-full w-14 h-14" alt="" />
                            <div className="flex flex-col overflow-hidden">
                                <span className="name block font-semibold truncate capitalize">
                                    {user.first_name} {user.last_name}
                                </span>
                                <span className="text-sm text-sky-600 truncate">
                                    {user.email}
                                </span>
                            </div>
                        </div>
                        <Link onClick={() => setOpenMenu(false)} href={`/${user._id}/subscriptions`} className="flex rounded-lg p-1 px-3 items-center transition-all ease-in-out gap-2 hover:bg-neutral-50">
                            <Icon icon='streamline:subscription-cashflow' fontSize={20} />
                            <span>Subsciriptions</span>
                        </Link>
                        <Link onClick={() => setOpenMenu(false)} href={`/${user._id}/profile`} className="flex rounded-lg p-1 px-3 items-center transition-all ease-in-out gap-2 hover:bg-neutral-50">
                            <Icon icon='material-symbols:person' fontSize={20} />
                            <span>Profile</span>
                        </Link>
                        <button className="flex rounded-lg p-1 px-3 items-center transition-all ease-in-out gap-2 text-rose-800 hover:bg-rose-100"
                            onClick={userLogout}>
                            <Icon icon='hugeicons:logout-04' fontSize={20} />
                            <span>Logout</span>
                        </button>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default User