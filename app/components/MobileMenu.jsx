import { Icon } from "@iconify/react/dist/iconify.js"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { AnimatePresence, motion } from 'framer-motion'
import { useClickAway } from "@uidotdev/usehooks"

function MobileMenu() {
    const user = useSelector(state => state.users.user)
    const [showMenu, setShowMenu] = useState(false)
    const ref = useClickAway(() => {
        setShowMenu(false)
    })

    useEffect(() => {
        showMenu ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible'
    }, [showMenu])
    return (
        <div className="mobile-menu max-md:block hidden ms-auto relative">
            <Icon icon='hugeicons:menu-09' className="cursor-pointer" fontSize={30} onClick={() => setShowMenu(true)}></Icon>
            <AnimatePresence>
                {
                    showMenu &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeOut" }}
                        className="overlay fixed h-screen w-full left-0 top-0 z-50"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: 250 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 250 }}
                            transition={{ ease: "easeOut", duration: 0.2 }}
                            className="side-menu flex flex-col fixed text-black w-[250px] h-screen right-0 top-0 shadow-lg bg-neutral-50"
                            ref={ref}
                        >
                            <Icon icon="iconoir:xmark" className="mb-auto ms-auto cursor-pointer m-5" fontSize={35} onClick={() => setShowMenu(false)}></Icon>
                            <ul className="flex flex-col gap-4 mb-auto items-center text-2xl p-5">
                                <li>
                                    <Link href='/about'>About</Link>
                                </li>
                                <li>
                                    <Link href='/exhabition'>Exhabition</Link>
                                </li>
                                <li>
                                    <Link href='/workshops'>Workshops</Link>
                                </li>
                            </ul>
                            {
                                !user
                                    ?
                                    <Link href='/login' className="main-btn text-center m-5">Get started</Link>
                                    :
                                    <div className="flex items-center gap-2 p-3 border-t ">
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
                            }
                        </motion.div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default MobileMenu