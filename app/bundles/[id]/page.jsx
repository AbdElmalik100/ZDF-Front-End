'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBundle } from '../../store/slices/bundlesSlice'
import Loader from '../../components/Loader'
import CheckoutMenu from '../../components/CheckoutMenu'
import { formatCurrency } from '../../lib/utils'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import moment from 'moment'

function BundleDetails() {
    const dispatch = useDispatch()
    const params = useParams()
    const { bundle } = useSelector(state => state.bundles)
    const { isLoggedIn } = useSelector(state => state.users)
    const { subscriptions } = useSelector(state => state.subscriptions)
    const [checkout, setCheckout] = useState(false)
    const [isBooked, setIsBooked] = useState(false)

    const router = useRouter()

    const booking = () => {
        isLoggedIn ? setCheckout(true) : router.push('/login')
    }

    useEffect(() => {
        if (isLoggedIn && bundle) {
            const checker = subscriptions.filter(sub => sub.bundle?._id === bundle._id)[0]
            checker ? setIsBooked(true) : setIsBooked(false)
        } else setIsBooked(false)
    }, [subscriptions, bundle, isLoggedIn])

    useEffect(() => {
        dispatch(getBundle(params.id))
    }, [params, dispatch])
    return (
        <div className='bundle-details min-h-screen py-32'>
            {
                !bundle
                    ?
                    <Loader></Loader>
                    :
                    <div className="container min-h-screen flex items-start max-lg:flex-col gap-10 px-4">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ ease: "easeOut", delay: 0.2 }}
                            className="image lg:w-1/2 w-full relative">
                            <img src="/images/star-medal.png" className='w-24 absolute -top-8 -rotate-12 -right-8 z-20' alt="Bundle badge" />
                            <img className='rounded-3xl' src={bundle.image} alt="Bundle image" />
                            {
                                !bundle.is_available &&
                                <span className="badge text-center absolute top-3 left-3 bg-red-700">Soldout</span>
                            }
                        </motion.div>
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ ease: "easeOut", delay: 0.2 }}
                            className="info lg:w-3/4 w-full flex flex-col gap-2">
                            <h3 className='font-bold capitalize text-3xl mb-4'>{bundle.title}</h3>
                            <div className='bundle-workshops'>
                                <h2 className='text-xl font-bold'>Workshops included in the bundle</h2>
                                <p className='text-neutral-400 text-sm lg:w-3/4'>These are the workshops you are gonna attend, By booking this bundle you should attend every workshop at it&apos;s date and time specified in the table below.</p>
                                <div className='grid xl:grid-cols-3 mt-4 h-full w-full gap-2 lg:grid-cols-2 '>
                                    {
                                        bundle.workshops.map((workshop, index) => (
                                            <div key={index} className="card h-auto rounded-2xl py-8 p-4 border text-center w-full flex flex-col">
                                                <img src={workshop.image} className='rounded-full object-cover h-40 w-40 object-top mx-auto' alt="Workshop image" />
                                                <h2 className='font-bold text-xl capitalize mt-2'>{workshop.title}</h2>
                                                <span className='font-medium text-sky-400 text-sm mb-auto'>{workshop.lecturer}</span>
                                                <ul className='mt-5 flex flex-col text-sm text-neutral-500 gap-1'>
                                                    <li>{new Date(workshop.date).toLocaleDateString()}</li>
                                                    <li>{moment(workshop.time_from, "HH:mm:ss").format("hh:mm A")} - {moment(workshop.time_to, "HH:mm:ss").format("hh:mm A")}</li>
                                                </ul>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            {
                                isBooked
                                    ?
                                    <div className="main-btn bg-green-600 hover:bg-green-600 md:w-fit w-full px-8 text-center mt-12 font-bold flex items-center justify-center gap-2" >
                                        <span>You have booked this bundle</span>
                                        <Icon icon="icon-park-solid:check-one" fontSize={20} />
                                    </div>
                                    :
                                    <button onClick={booking} className="main-btn md:w-fit w-full px-8 text-center mt-12 disabled:opacity-50 disabled:pointer-events-none font-bold" disabled={!bundle.is_available}>Book now for {formatCurrency.format(bundle.price)}</button>
                            }
                        </motion.div>
                        <CheckoutMenu type="bundle" checkout={checkout} setCheckout={setCheckout} bundle={bundle}></CheckoutMenu>
                    </div>
            }
        </div>
    )
}

export default BundleDetails