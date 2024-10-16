'use client'
import { motion } from 'framer-motion'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { formatCurrency } from '../lib/utils'
import Link from 'next/link'
import NewBadge from '../components/NewBadge'

function Workshops() {
    const { workshops, loading } = useSelector(state => state.workshops)

    return (
        <div className='min-h-screen py-16 mt-16 relative bg-neutral-50 bg-grid-black/[0.2]'>
            {
                loading
                    ?
                    <Loader></Loader>
                    :
                    <>
                        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-neutral-50 [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]"></div>
                        <div className="container min-h-screen relative z-10 px-4">
                            <motion.div
                                initial={{ y: 25, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ ease: "easeOut", delay: 0.2 }}
                            >
                                <h3 className='heading lg:text-5xl text-2xl font-bold uppercase text-center xl:w-1/2 lg:w-3/4 w-full mx-auto'>Find our workshops here, Gain an experience now.</h3>
                            </motion.div>
                            <div className='boxes-container mt-20'>
                                {/* <div className="filter-sort-header"></div> */}
                                <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                                    {
                                        workshops.map((workshop, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ y: 25, opacity: 0 }}
                                                whileInView={{ y: 0, opacity: 1 }}
                                                transition={{ ease: "easeOut", delay: 0.2 * index }}
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
                                                    <Link href={`/workshops/${workshop._id}`} className="main-btn text-center mt-auto disabled:opacity-50 disabled:pointer-events-none font-bold" disabled={!workshop.is_available}>Book now</Link>
                                                </div>
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default Workshops