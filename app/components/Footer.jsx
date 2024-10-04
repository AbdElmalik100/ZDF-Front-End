import Image from "next/image"
import darkLogo from '../assets/images/ZDF - Z Dental Forum White.png'
import Link from "next/link"
import { Icon } from "@iconify/react"
import { motion } from 'framer-motion'


function Footer() {
    return (
        <motion.div
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ease: "easeOut"}}
        >
            <footer className="py-12 bg-neutral-900 text-neutral-300">
                <div className="container">
                    <div className="grid lg:grid-cols-3 md:grid-col-2 grid-col-1 gap-10 max-lg:justify-center max-lg:text-center">
                        <div className="left">
                            <div className="logo">
                                <Link href='/'>
                                    <Image src={darkLogo} width={125} alt="ZDF Logo" ></Image>
                                </Link>
                            </div>
                        </div>
                        <div className="middle flex items-start justify-between gap-14 text-neutral-400 max-lg:flex-col">
                            <ul className="flex flex-col gap-3 w-full max-lg:items-center">
                                <li className="transition-all ease-in-out hover:text-white w-fit">
                                    <Link href='/about'>
                                        About
                                    </Link>
                                </li>
                                <li className="transition-all ease-in-out hover:text-white w-fit">
                                    <Link href='/about'>
                                        Exhabition
                                    </Link>
                                </li>
                                <li className="transition-all ease-in-out hover:text-white w-fit">
                                    <Link href='/about'>
                                        Workshops
                                    </Link>
                                </li>
                            </ul>
                            <ul className="flex flex-col gap-3 w-full max-lg:items-center">
                                <li className="transition-all ease-in-out hover:text-white w-fit">
                                    <Link href='/contact'>
                                        Contact Us
                                    </Link>
                                </li>
                                <li className="transition-all ease-in-out hover:text-white w-fit">
                                    <Link href='/privacy'>
                                        Privacy
                                    </Link>
                                </li>
                                <li className="transition-all ease-in-out hover:text-white w-fit">
                                    <Link href='/terms-and-conditions'>
                                        Terms & Conditions
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="right text-end flex flex-col items-start w-fit ms-auto">
                            <h3 className="text-xl">
                                Connect with us
                            </h3>
                            <div className="social mt-4 self-center flex items-center gap-3">
                                <a href="https://www.facebook.com/ZDentalForum/" className="w-10 h-10 rounded-full border-2 text-neutral-400 border-neutral-500 grid place-items-center transition-all ease-in-out hover:text-white hover:border-white" target="_blank">
                                    <Icon icon='ion:social-facebook' fontSize={22}></Icon>
                                </a>
                                <a href="https://www.instagram.com/zdentalforum/" className="w-10 h-10 rounded-full border-2 text-neutral-400 border-neutral-500 grid place-items-center transition-all ease-in-out hover:text-white hover:border-white" target="_blank">
                                    <Icon icon='mdi:instagram' fontSize={22}></Icon>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="copyright mt-24 text-xs text-neutral-500 flex items-center justify-between max-md:text-base max-md:justify-center">
                        <p>&copy; 2024 ZDF Inc, All rights reserved</p>
                    </div>
                </div>
            </footer>
        </motion.div>
    )
}

export default Footer