import Link from "next/link"
import { motion } from 'framer-motion'
import { Icon } from "@iconify/react"

function LatestWorkshops() {
    const workShops = [
        {
            img: "https://placehold.co/200X200?text=?",
            title: "Dental photography workshop",
            desc: 'We will discuss the wise use of photography in the dental field and trying to take photoshots for the full arch in the real life experience.',
            is_available: true,
            new: false,
        },
        {
            img: "https://placehold.co/200X200?text=?",
            title: "Digital marketing workshop",
            desc: 'We will discuss the wise use of photography in the dental field and trying to take photoshots for the full arch in the real life experience.',
            is_available: false,
            new: false
        },
        {
            img: "https://placehold.co/200X200?text=?",
            title: "Operative cases workshop",
            desc: 'We will discuss the wise use of photography in the dental field and trying to take photoshots for the full arch in the real life experience.',
            is_available: true,
            new: true
        },
    ]

    return (
        <section className="latest-workshops w-full bg-neutral-50 bg-grid-black/[0.2] relative flex items-center justify-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-neutral-50 [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]"></div>
            <div className=" py-32 relative z-50">
                <div className="container xl:px-28 px-4">
                    <motion.div
                        initial={{ y: 25, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ ease: "easeOut", delay: 0.5 }}
                    >
                        <h2 className="heading md:w-2/3 w-full mx-auto max-md:text-3xl">Take a look at the newest workshops</h2>
                    </motion.div>
                    <div className="mt-12 flex lg:gap-10 gap-5 h-full max-lg:flex-col">
                        {
                            workShops.map((workshop, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 25, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ ease: "easeOut", delay: 0.2 * index }}
                                >
                                    <div className="card relative rounded-2xl w-full border p-4 flex flex-col shadow-sm transition-all ease-in-out hover:shadow-lg bg-neutral-50 h-full">
                                        {
                                            workshop.new &&
                                            <div className="new w-fit grid place-items-center absolute z-20 -right-3 -top-3">
                                                <img src="/images/new.png" className="w-10 h-10 animate-ping rounded-full absolute opacity-55" alt="New" />
                                                <img src="/images/new.png" className="w-16 h-16" alt="New" />
                                            </div>
                                        }
                                        <Link href='/' className="image w-full h-64 relative">
                                            {
                                                !workshop.is_available &&
                                                <span className="badge bg-red-700">Soldout</span>
                                            }
                                            <img className='w-full h-full object-cover rounded-2xl' src={workshop.img} alt="" />
                                        </Link>
                                        <div className="info mt-4">
                                            <Link href='/' className="text-xl font-bold hover:underline">{workshop.title}</Link>
                                            <p className="mt-3 mb-8">{workshop.desc}</p>
                                        </div>
                                        <button className="main-btn mt-auto disabled:opacity-50 disabled:pointer-events-none font-bold" disabled={!workshop.is_available}>Book now</button>
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
                        <Link href='/' className="flex items-center gap-2 mt-14 mx-auto w-fit justify-center transition-all ease-in-out link-hover">
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