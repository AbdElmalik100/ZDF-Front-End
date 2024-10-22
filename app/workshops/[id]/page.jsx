'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWorkshop, updateWorkshop } from '../../store/slices/workshopsSlice'
import Loader from '../../components/Loader'
import NewBadge from '../../components/NewBadge'
import { Icon } from '@iconify/react'
import moment from 'moment'
import { formatCurrency } from '../../lib/utils'
import { motion } from 'framer-motion'
import CheckoutMenu from '../../components/CheckoutMenu'
import axios from 'axios'


function WorkshopDetails() {
    const params = useParams()
    const dispatch = useDispatch()
    const router = useRouter()
    const { workshop } = useSelector(state => state.workshops)
    const { isLoggedIn } = useSelector(state => state.users)
    const { subscriptions } = useSelector(state => state.subscriptions)
    const [checkout, setCheckout] = useState(false)
    const [isBooked, setIsBooked] = useState(false)
    const [isLimitExceeded, setIsLimitExceeded] = useState(false)

    const booking = () => {
        isLoggedIn ? setCheckout(true) : router.push('/login')
    }

    const checkLimitation = async () => {
        await axios.get("api/subscriptions")
            .then(response => {
                const subscriptions = response.data.filter(sub => sub.workshop?._id === workshop._id)
                if (subscriptions.length == workshop.limit) {
                    setIsLimitExceeded(true)
                    dispatch(updateWorkshop({ ...workshop, is_available: false }))
                }
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (isLoggedIn && workshop) {
            const checker = subscriptions.filter(sub => sub.workshop?._id === workshop._id)[0]
            checker ? setIsBooked(true) : setIsBooked(false)
            checkLimitation()
        } else setIsBooked(false)
    }, [subscriptions, workshop, isLoggedIn])

    useEffect(() => {
        dispatch(getWorkshop(params.id))
    }, [dispatch, params])

    return (
        <div className='workshop-details min-h-screen py-32'>
            {
                !workshop
                    ?
                    <Loader></Loader>
                    :
                    <div className="container min-h-screen flex items-start max-md:flex-col gap-10 xl:px-40 lg:px-32 px-4">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ ease: "easeOut", delay: 0.2 }}
                            className="image lg:w-1/3 w-full relative">
                            <img className='rounded-3xl' src={workshop.image} alt="Workshop image" />
                            <NewBadge workshop={workshop}></NewBadge>
                            <div className="absolute top-3 left-3 flex flex-col gap-2">
                                {
                                    (!workshop.is_available || isLimitExceeded) &&
                                    <span className="badge text-center relative top-0 left-0 bg-red-700">Soldout</span>
                                }
                                {
                                    workshop.discount > 0 &&
                                    <span className="badge text-center relative top-0 left-0 bg-red-700">
                                        Discount -{workshop.discount}%
                                    </span>
                                }
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ ease: "easeOut", delay: 0.2 }}
                            className="info lg:w-3/4 w-full flex flex-col gap-2">
                            <span className='text-sm text-neutral-400 mb-3'>{workshop.lecturer}</span>
                            <h3 className='font-bold capitalize text-3xl'>{workshop.title}</h3>
                            <p className='text-neutral-600 capitalize'>{workshop.description}</p>
                            <ul className="sub-info mt-5 flex flex-col gap-4">
                                <li className="flex items-center gap-2 capitalize">
                                    <Icon icon="ic:round-location-on" fontSize={24} />
                                    <span className="flex-1">{workshop.location}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Icon icon="solar:calendar-minimalistic-bold" fontSize={24} />
                                    <span>{new Date(workshop.date).toLocaleDateString()}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Icon icon="mdi:clock-time-five" fontSize={24} />
                                    <span>
                                        {moment(workshop.time_from, "HH:mm:ss").format("hh:mm A")} - {moment(workshop.time_to, "HH:mm:ss").format("hh:mm A")}
                                    </span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Icon icon="mingcute:currency-pound-fill" fontSize={24} />

                                    <div className='flex items-center gap-2'>
                                        <span>
                                            {formatCurrency.format(workshop.price - ((workshop.price * workshop.discount) / 100))}
                                        </span>
                                        {
                                            workshop.discount > 0 && <span className='text-xs line-through text-neutral-400'>{formatCurrency.format(workshop.price)}</span>
                                        }
                                    </div>
                                </li>
                            </ul>
                            {
                                isBooked
                                    ?
                                    <div className="main-btn bg-green-600 hover:bg-green-600 md:w-fit w-full px-8 text-center mt-12 font-bold flex items-center justify-center gap-2" >
                                        <span>You have booked this workshop</span>
                                        <Icon icon="icon-park-solid:check-one" fontSize={20} />
                                    </div>
                                    :
                                    <button onClick={booking} className="main-btn md:w-fit w-full px-8 text-center mt-12 disabled:opacity-50 disabled:pointer-events-none font-bold" disabled={!workshop.is_available || isLimitExceeded}>Book now for {formatCurrency.format(workshop.price - ((workshop.price * workshop.discount) / 100))}</button>
                            }
                        </motion.div>
                        <CheckoutMenu type="workshop" checkout={checkout} setCheckout={setCheckout} workshop={workshop}></CheckoutMenu>
                    </div>
            }
        </div>
    )
}

export default WorkshopDetails