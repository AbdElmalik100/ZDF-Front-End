'use client'
import Image from "next/image"
import Link from "next/link"
import logo from '../assets/images/ZDF - Z Dental Forum Black.png'
import { usePathname } from "next/navigation"
import User from '../components/User'
import { useSelector } from "react-redux"
import MobileMenu from './MobileMenu'

function Header() {
    const pathname = usePathname()
    const user = useSelector(state => state.users.user)

    return (
        <header className='py-3 border-b fixed w-full top-0 bg-neutral-50/50 z-[999] h-[62px] backdrop-blur-sm grid place-items-center'>
            <div className="container px-4 flex items-center gap-5 justify-between">
                <div className="logo">
                    <Link href='/'>
                        <Image priority src={logo} width={75} alt="ZDF Logo"></Image>
                    </Link>
                </div>
                <ul className="links flex items-center gap-3 max-md:hidden">
                    <li className={`link-hover ${pathname.includes('/about') ? 'link-active' : ''}`}>
                        <Link href='/about'>
                            About
                        </Link>
                    </li>
                    <li className={`link-hover ${pathname.includes('/exhabition') ? 'link-active' : ''}`}>
                        <Link href='/exhabition'>
                            Exhabition
                        </Link>
                    </li>
                    <li className={`link-hover ${pathname.includes('/workshops') ? 'link-active' : ''}`}>
                        <Link href='/workshops'>
                            Workshops
                        </Link>
                    </li>
                </ul>
                <MobileMenu></MobileMenu>
                {
                    user
                        ?
                        <User></User>
                        :
                        <div className="register max-md:hidden">
                            <Link href='/login' className="main-btn">Get started</Link>
                        </div>
                }
            </div>
        </header>
    )
}

export default Header