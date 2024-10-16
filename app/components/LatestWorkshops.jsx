'use client'
import Link from "next/link"
import { motion } from 'framer-motion'
import { Icon } from "@iconify/react"
import { useSelector } from "react-redux"
import { formatCurrency } from "../lib/utils"
import NewBadge from "./NewBadge"

function LatestWorkshops() {
    const { workshops } = useSelector(state => state.workshops)

    return (
        workshops &&
        <section className="latest-workshops w-full bg-neutral-50 bg-grid-black/[0.2] relative">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-neutral-50 [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]"></div>
            <div className=" py-32 relative z-50">
                <div className="container xl:px-32 px-4">
                    <motion.div
                        initial={{ y: 25, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ ease: "easeOut", delay: 0.5 }}
                    >
                        <h2 className="heading md:w-2/3 w-full mx-auto max-md:text-3xl">Take a look at the newest workshops</h2>
                    </motion.div>
                    <div className="mt-12 flex lg:gap-5 gap-3 h-full justify-between max-lg:flex-col">
                        {
                            workshops.map((workshop, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 25, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ ease: "easeOut", delay: 0.2 * index }}
                                    className="lg:w-[calc(100%/3)]"
                                >
                                    <div className="card relative rounded-2xl w-[full] border p-4 flex flex-col shadow-sm transition-all ease-in-out hover:shadow-lg bg-neutral-50 h-full">
                                        <NewBadge workshop={workshop}></NewBadge>
                                        <Link href={`/workshops/${workshop._id}`} className="image w-full lg:h-96 h-80 relative">
                                            <div className="absolute top-3 left-3 flex flex-col gap-2">
                                                {
                                                    !workshop.is_available &&
                                                    <span className="badge text-center relative top-0 left-0 bg-red-700">Soldout</span>
                                                }
                                                {
                                                    workshop.discount > 0 &&
                                                    <span className="badge text-center relative top-0 left-0 bg-red-700">
                                                        Discount -{workshop.discount}%
                                                    </span>
                                                }
                                            </div>
                                            <img className='w-full h-full object-cover object-[50%,20%] rounded-2xl' src={workshop.image} alt="Workshop image" />
                                        </Link>
                                        <div className="info mt-4 flex flex-col">
                                            <span className="mb-1 text-sm text-neutral-400 block">{workshop.lecturer}</span>
                                            <Link href={`/workshops/${workshop._id}`} className="text-xl font-bold hover:underline capitalize">{workshop.title}</Link>
                                            <p className="mt-2 mb-2 text-neutral-600 capitalize line-clamp-3">{workshop.description}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold block my-4">
                                                    {formatCurrency.format(workshop.price - ((workshop.price * workshop.discount) / 100))}
                                                </span>
                                                {
                                                    workshop.discount > 0 && <span className="text-xs text-neutral-400 line-through block my-4">{formatCurrency.format(workshop.price)}</span>
                                                }
                                            </div>
                                        </div>
                                        <Link href={`/workshops/${workshop._id}`} className="main-btn text-center mt-auto disabled:opacity-50 font-bold">Book now</Link>
                                    </div>
                                </motion.div>
                            ))
                        }
                    </div>
                    <motion.div
                        initial={{ y: 25, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ ease: "easeOut", delay: 0.2 }}
                    >
                        <Link href='/workshops' className="flex items-center gap-2 mt-14 mx-auto w-fit justify-center transition-all ease-in-out link-hover">
                            <span>See more</span>
                            <Icon icon='material-symbols:arrow-right-alt-rounded' fontSize={22}></Icon>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default LatestWorkshops