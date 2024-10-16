import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { formatCurrency } from '../lib/utils'
import Link from 'next/link'
import moment from 'moment'


function Bundles() {
    const { bundles } = useSelector(state => state.bundles)

    return (
        bundles.length > 0 &&
        <section className='bundles py-32 relative'>
            <div className="container px-4">
                <motion.div
                    initial={{ y: 25, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", delay: 0.5 }}
                >
                    <h3 className="heading max-md:text-3xl">our limited bundles</h3>
                </motion.div>
                <div className='mt-8 flex items-start gap-3 justify-center'>
                    {
                        bundles.map((bundle, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 25, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ ease: "easeOut", delay: 0.2 * index }}
                                className="lg:w-[calc(100%/3)]"
                            >
                                <div className='card relative rounded-2xl w-[full] border p-4 flex flex-col shadow-sm transition-all ease-in-out hover:shadow-lg h-full'>
                                    <img src="/images/star-medal.png" className='w-24 absolute -top-8 -rotate-12 -right-8 z-20' alt="Bundle badge" />
                                    <div className="image w-full lg:h-96 h-80 relative">
                                        {
                                            !bundle.is_available &&
                                            <span className="badge text-center absolute top-3 left-3 bg-red-700">Soldout</span>
                                        }
                                        <img className='w-full h-full object-cover object-[50%,20%] rounded-2xl' src={bundle.image} alt="Bundle image" />
                                    </div>
                                    <div className="info mt-4 flex flex-col">
                                        <Link href={`/bundles/${bundle._id}`} className="text-2xl font-bold hover:underline capitalize">{bundle.title}</Link>
                                        <div className='flex items-center my-3 relative'>
                                            {
                                                bundle.workshops.map((workshop, index) => (
                                                    <div key={index} className='[&:not(:first-child)]:-ms-5 relative hover:z-10 group'>
                                                        <img className={`rounded-full border-2 cursor-pointer border-neutral-50 object-cover h-12 w-12 object-top`} src={workshop.image} alt="Workshop image" />
                                                        <div className={`workshop-info flex items-start gap-3 p-4 min-w-[350px] transition-all ease-in-out invisible scale-90 opacity-0 group-hover:scale-100 group-hover:visible group-hover:opacity-100 absolute rounded-2xl border bg-white shadow-md -left-6 bottom-14`}>
                                                            <div className='image'>
                                                                <img src={workshop.image} className='rounded-full border border-sky-500 w-12 h-12 object-cover object-top' alt="Workshop image card" />
                                                            </div>
                                                            <div className='flex-1'>
                                                                <h3 className='capitalize font-bold text-base'>{workshop.title}</h3>
                                                                <span className='text-xs text-sky-500 block font-semibold'>{ workshop.lecturer }</span>
                                                                <div className='flex text-xs capitalize items-start mt-2 text-neutral-500 gap-1 flex-col'>
                                                                    <span>{workshop.location}</span>
                                                                    <span>{new Date(workshop.date).toLocaleDateString()}</span>
                                                                    <span>{moment(workshop.time_from, "HH:mm:ss").format("hh:mm A")} - {moment(workshop.time_to, "HH:mm:ss").format("hh:mm A")}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <span className="text-lg font-bold block my-4">{formatCurrency.format(bundle.price)}</span>
                                        <Link href={`/bundles/${bundle._id}`} className="main-btn text-center mt-auto disabled:opacity-50 font-bold">Book now</Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Bundles