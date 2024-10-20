'use client'
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickAway } from '@uidotdev/usehooks'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { formatCurrency } from '../lib/utils'
import Tooltip from '../components/Tooltip'
import { useRouter } from 'next/navigation'
import axios from 'axios'


function CheckoutMenu({ checkout, setCheckout, type, workshop, bundle }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [paymentData, setPaymentData] = useState({
        "amount": (100 * 100),
        "currency": "EGP",
        "payment_methods": [
            4842484,
            4842487,
        ],

        "items": [
            {
                "id": "",
                "image": '',
                "name": "Item name 1",
                "amount": (100 * 100),
                "description": "Watch",
            }
        ],
        "billing_data": {
            "apartment": "",
            "first_name": "Ammar",
            "last_name": "Sadek",
            "street": "",
            "building": "",
            "phone_number": "+96824480228",
            "country": "Egypt",
            "email": "AmmarSadek@gmail.com",
            "floor": "",
            "state": ""
        },
        "customer": {
            "first_name": "Ammar",
            "last_name": "Sadek",
            "email": "AmmarSadek@gmail.com"
        }
    })

    const payment = async (paymentData) => {
        await axios.post("https://accept.paymob.com/v1/intention/", paymentData, {
            headers: {
                Authorization: `Token ${process.env.NEXT_PUBLIC_PAYMOB_SECRET_KEY}`
            },
        })
            .then(response => {
                console.log(response);
                router.push(`https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.NEXT_PUBLIC_PAYMOB_PUBLIC_KEY}&clientSecret=${response.data.client_secret}`)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handlePayment = (type, paymentTab) => {
        try {
            setLoading(true);
            localStorage.setItem("PCO", JSON.stringify({ ...paymentData, type: type }));
            if (paymentTab === 'card') {
                const transferedData = { ...paymentData, payment_methods: [4842484] }
                payment(transferedData)
            } else {
                const transferedData = { ...paymentData, payment_methods: [4842487] }
                payment(transferedData)
            }
            console.log(`${paymentTab} payment process started successfully.`);
        } catch (error) {
            setLoading(false);
            console.error(`Error starting ${paymentTab} payment process:`, error);
        }
    };



    const EventCheckoutRender = () => {
        const { event } = useSelector(state => state.events)
        const { user } = useSelector(state => state.users)
        const [eventData, setEventData] = useState({ ...event })
        const [paymentTab, setPaymentTab] = useState('card')
        const checkoutRef = useClickAway(() => {
            setCheckout(false)
        })

        useEffect(() => {
            const tax = ((eventData.ticket_price * 5) / 100)
            const totalCalcualtion = (+eventData.ticket_price + tax)
            checkout ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible"
            setPaymentTab("card")
            setEventData({ ...eventData, tax: tax, net_total: totalCalcualtion })
            setPaymentData({
                ...paymentData,
                amount: (totalCalcualtion * 100),
                items: [
                    {
                        id: event._id,
                        image: event.image,
                        name: event.title,
                        amount: (totalCalcualtion * 100),
                        description: event.description.substr(0, 100)
                    }
                ],
                customer: {
                    id: user?._id,
                    first_name: user?.first_name,
                    last_name: user?.last_name,
                    email: user?.email,
                }
            })
        }, [checkout])

        return (
            <AnimatePresence>
                {
                    checkout &&
                    <motion.div
                        key={"checkout-overlay"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeOut" }}
                        className="overlay fixed z-[999999] top-0 left-0 w-full h-full"
                    >
                        <motion.div
                            key={"checkout-menu"}
                            initial={{ x: 750 }}
                            animate={{ x: 0 }}
                            exit={{ x: 750 }}
                            transition={{ ease: "easeOut" }}
                            ref={checkoutRef}
                            className="checkout-menu bg-white absolute right-0 top-0 h-full w-[375px] max-md:w-full flex flex-col"
                        >
                            <div className="flex-grow h-full flex flex-col p-5 overflow-auto [&:scrollbar-width:none]">
                                <div className="close mb-3">
                                    <Icon icon="iconoir:xmark" className="ms-auto cursor-pointer" fontSize={35} onClick={() => setCheckout(false)}></Icon>
                                </div>
                                <img className='w-full rounded-xl object-cover' src={eventData.image} alt="Event image" />
                                <div className="info mt-2">
                                    <h2 className="text-xl font-bold capitalize">{eventData.title}</h2>
                                    <ul className="event-info flex flex-col text-sm mt-3 gap-3">
                                        <li className="flex items-center gap-2">
                                            <Icon icon="ic:round-location-on" fontSize={20} />
                                            <span className="flex-1 capitalize">{eventData.venue}</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Icon icon="solar:calendar-minimalistic-bold" fontSize={20} />
                                            <span>{new Date(eventData.date).toLocaleDateString()}</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Icon icon="mdi:clock-time-five" fontSize={20} />
                                            <span>
                                                {moment(eventData.time_from, "HH:mm:ss").format("hh:mm A")} - {moment(eventData.time_to, "HH:mm:ss").format("hh:mm A")}
                                            </span>
                                        </li>
                                    </ul>
                                    <div className="price mt-8 text-neutral-400 text-sm font-normal flex flex-col gap-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <span>Ticket price</span>
                                            <span>{formatCurrency.format(eventData.ticket_price)}</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                            <span>Discount %</span>
                                            <span>{formatCurrency.format(0)}</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                            <span className='flex items-center gap-1'>Tax (5%) <Tooltip></Tooltip></span>
                                            <span>{formatCurrency.format(eventData.tax)}</span>
                                        </div>
                                        <div className="mt-2 pt-2 border-t font-bold text-xl text-neutral-950 flex items-center justify-between gap-2">
                                            <span>Total</span>
                                            <span>{formatCurrency.format(eventData.net_total)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="payment-method mt-5 mb-12">
                                    <h3 className="font-bold">Choose your payment method</h3>
                                    <div className="tabs flex items-start gap-2 mt-3 flex-col">
                                        <div onClick={() => setPaymentTab("card")}
                                            className={`border p-2 transition-all ease-in-out px-4 w-full items-center justify-start flex gap-2 rounded-lg cursor-pointer hover:bg-neutral-50  ${paymentTab === 'card' ? "text-sky-400 border-sky-400" : ""}`}>
                                            <Icon icon="bi:credit-card-fill" fontSize={24} />
                                            <div className="flex flex-col">
                                                <span>Credit/Debit Card</span>
                                            </div>
                                        </div>
                                        <div onClick={() => setPaymentTab("wallet")}
                                            className={`border p-2 transition-all ease-in-out px-4 items-center justify-start flex gap-2 w-full rounded-lg cursor-pointer hover:bg-neutral-50  ${paymentTab === 'wallet' ? "text-sky-400 border-sky-400" : ""}`}>
                                            <Icon icon="fluent:wallet-credit-card-48-filled" fontSize={24} />
                                            <div className="flex flex-col">
                                                <span>Mobile Wallet</span>
                                                <span className="text-neutral-400 text-xs">Vodafone, Orange, Etisalat, CIB, or any e-wallet</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <button className="main-btn mb-3 w-full font-bold flex items-center gap-1 justify-center disabled:opacity-50 disabled:hover:bg-sky-500"
                                        onClick={() => handlePayment('event', paymentTab)}
                                        disabled={loading}
                                    >
                                        {
                                            loading
                                                ?
                                                <>
                                                    <span>Processing...</span>
                                                    <Icon icon="iconamoon:synchronize-fill" className='animate-spin' fontSize={22} />
                                                </>
                                                :
                                                <>
                                                    <span>Proceed to payment</span>
                                                    <Icon icon="material-symbols:check-rounded" fontSize={22} />
                                                </>
                                        }
                                    </button>
                                    <img src="/images/paymob.png" className="w-24 mx-auto" alt="" />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                }
            </AnimatePresence>
        )
    }
    const WorkshopCheckoutRender = () => {
        const { user } = useSelector(state => state.users)
        const [workshopData, setWorkshopData] = useState({ ...workshop })
        const [paymentTab, setPaymentTab] = useState('card')
        const checkoutRef = useClickAway(() => {
            setCheckout(false)
        })


        useEffect(() => {
            const tax = ((5 * workshop.price) / 100)
            const totalCalcualtion = (workshop.price - ((workshop.price * workshop.discount) / 100)) + tax
            checkout ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible"
            setPaymentTab("card")
            setWorkshopData({ ...workshop, tax: tax, net_total: totalCalcualtion })
            setPaymentData({
                ...paymentData,
                amount: (totalCalcualtion * 100),
                items: [
                    {
                        id: workshop._id,
                        image: workshop.image,
                        name: workshop.title,
                        amount: (totalCalcualtion * 100),
                        description: workshop.description.substr(0, 100)
                    }
                ],
                customer: {
                    id: user?._id,
                    first_name: user?.first_name,
                    last_name: user?.last_name,
                    email: user?.email,
                }
            })
        }, [checkout])

        return (
            <AnimatePresence>
                {
                    checkout &&
                    <motion.div
                        key={"checkout-overlay"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeOut" }}
                        className="overlay fixed z-[999999] top-0 left-0 w-full h-full"
                    >
                        <motion.div
                            key={"checkout-menu"}
                            initial={{ x: 750 }}
                            animate={{ x: 0 }}
                            exit={{ x: 750 }}
                            transition={{ ease: "easeOut" }}
                            ref={checkoutRef}
                            className="checkout-menu bg-white h-full absolute right-0 top-0 w-[375px] max-md:w-full flex flex-col"
                        >
                            <div className="flex-grow h-full flex flex-col p-5 overflow-auto [&:scrollbar-width:none]">
                                <div className="close mb-3">
                                    <Icon
                                        icon="iconoir:xmark"
                                        className="ms-auto cursor-pointer"
                                        fontSize={35}
                                        onClick={() => setCheckout(false)}
                                    />
                                </div>
                                <img
                                    className="w-full rounded-xl object-cover h-[250px] object-[50%,20%]"
                                    src={workshopData.image}
                                    alt="Workshop image"
                                />

                                <div className="info mt-2">
                                    <h2 className="text-xl font-bold capitalize">{workshopData.title}</h2>
                                    <ul className="event-info flex flex-col text-sm mt-3 gap-3">
                                        <li className="flex items-center gap-2">
                                            <Icon icon="ic:round-location-on" fontSize={20} />
                                            <span className="flex-1 capitalize">{workshopData.location}</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Icon icon="solar:calendar-minimalistic-bold" fontSize={20} />
                                            <span>{new Date(workshopData.date).toLocaleDateString()}</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Icon icon="mdi:clock-time-five" fontSize={20} />
                                            <span>
                                                {moment(workshopData.time_from, "HH:mm:ss").format("hh:mm A")} -{" "}
                                                {moment(workshopData.time_to, "HH:mm:ss").format("hh:mm A")}
                                            </span>
                                        </li>
                                    </ul>

                                    <div className="price mt-8 text-neutral-500 text-sm font-normal flex flex-col gap-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <span>Price</span>
                                            <span>{formatCurrency.format(workshopData.price)}</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                            <span>Discount {(workshopData.discount)}%</span>
                                            <span>{formatCurrency.format(((workshopData.price * workshopData.discount) / 100))}</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                            <span className='flex items-center gap-1'>Tax (5%) <Tooltip></Tooltip></span>
                                            <span>{formatCurrency.format(workshopData.tax)}</span>
                                        </div>
                                        <div className="mt-2 pt-2 border-t font-bold text-xl text-neutral-950 flex items-center justify-between gap-2">
                                            <span>Total</span>
                                            <span>{formatCurrency.format(workshopData.net_total)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="payment-method mt-5 mb-12">
                                    <h3 className="font-bold">Choose your payment method</h3>
                                    <div className="tabs flex items-start gap-2 mt-3 flex-col">
                                        <div
                                            onClick={() => setPaymentTab("card")}
                                            className={`border p-2 transition-all ease-in-out px-4 w-full items-center justify-start flex gap-2 rounded-lg cursor-pointer hover:bg-neutral-50 ${paymentTab === "card" ? "text-sky-400 border-sky-400" : ""
                                                }`}
                                        >
                                            <Icon icon="bi:credit-card-fill" fontSize={24} />
                                            <div className="flex flex-col">
                                                <span>Credit/Debit Card</span>
                                            </div>
                                        </div>
                                        <div
                                            onClick={() => setPaymentTab("wallet")}
                                            className={`border p-2 transition-all ease-in-out px-4 w-full items-center justify-start flex gap-2 rounded-lg cursor-pointer hover:bg-neutral-50 ${paymentTab === "wallet" ? "text-sky-400 border-sky-400" : ""
                                                }`}
                                        >
                                            <Icon icon="fluent:wallet-credit-card-48-filled" fontSize={24} />
                                            <div className="flex flex-col">
                                                <span>Mobile Wallet</span>
                                                <span className="text-neutral-400 text-xs">
                                                    Vodafone, Orange, Etisalat, CIB, or any e-wallet
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <button
                                        className="main-btn mb-3 w-full font-bold flex items-center gap-1 justify-center disabled:opacity-50 disabled:hover:bg-sky-500"
                                        onClick={() => handlePayment('workshop', paymentTab)}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span>Processing...</span>
                                                <Icon icon="iconamoon:synchronize-fill" className="animate-spin" fontSize={22} />
                                            </>
                                        ) : (
                                            <>
                                                <span>Proceed to payment</span>
                                                <Icon icon="material-symbols:check-rounded" fontSize={22} />
                                            </>
                                        )}
                                    </button>
                                    <img src="/images/paymob.png" className="w-24 mx-auto" alt="Paymob" />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                }
            </AnimatePresence>
        )
    }
    const BundleCheckoutRender = () => {
        const { user } = useSelector(state => state.users)
        const [bundleData, setBundleData] = useState({ ...bundle })
        const [paymentTab, setPaymentTab] = useState('card')
        const checkoutRef = useClickAway(() => {
            setCheckout(false)
        })

        useEffect(() => {
            const tax = ((5 * bundle.price) / 100)
            const totalCalcualtion = +bundle.price + tax
            checkout ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible"
            setPaymentTab("card")
            setBundleData({ ...bundle, tax: tax, net_total: totalCalcualtion })
            setPaymentData({
                ...paymentData,
                amount: (totalCalcualtion * 100),
                items: [
                    {
                        id: bundle._id,
                        image: bundle.image,
                        name: bundle.title,
                        amount: (totalCalcualtion * 100),
                        description: bundle.description.substr(0, 100)
                    }
                ],
                customer: {
                    id: user?._id,
                    first_name: user?.first_name,
                    last_name: user?.last_name,
                    email: user?.email,
                }
            })
        }, [checkout])

        return (
            <AnimatePresence>
                {
                    checkout &&
                    <motion.div
                        key={"checkout-overlay"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeOut" }}
                        className="overlay fixed z-[999999] top-0 left-0 w-full h-full"
                    >
                        <motion.div
                            key={"checkout-menu"}
                            initial={{ x: 750 }}
                            animate={{ x: 0 }}
                            exit={{ x: 750 }}
                            transition={{ ease: "easeOut" }}
                            ref={checkoutRef}
                            className="checkout-menu bg-white h-full absolute right-0 top-0 w-[375px] max-md:w-full flex flex-col"
                        >
                            <div className="flex-grow h-full flex flex-col p-5 overflow-auto [&:scrollbar-width:none]">
                                <div className="close mb-3">
                                    <Icon
                                        icon="iconoir:xmark"
                                        className="ms-auto cursor-pointer"
                                        fontSize={35}
                                        onClick={() => setCheckout(false)}
                                    />
                                </div>
                                <img
                                    className="w-full rounded-xl object-cover h-[250px] object-[50%,20%]"
                                    src={bundleData.image}
                                    alt="Workshop image"
                                />

                                <div className="info mt-2">
                                    <h2 className="text-xl font-bold capitalize">{bundleData.title}</h2>
                                    <div className="price mt-8 text-neutral-500 text-sm font-normal flex flex-col gap-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <span>Price</span>
                                            <span>{formatCurrency.format(bundleData.price)}</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                            <span>Discount {(bundleData.discount || '')}%</span>
                                            <span>{formatCurrency.format(((bundleData.price * bundleData.discount) / 100) || 0)}</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                            <span className='flex items-center gap-1'>Tax (5%) <Tooltip></Tooltip></span>
                                            <span>{formatCurrency.format(bundleData.tax)}</span>
                                        </div>
                                        <div className="mt-2 pt-2 border-t font-bold text-xl text-neutral-950 flex items-center justify-between gap-2">
                                            <span>Total</span>
                                            <span>{formatCurrency.format(bundleData.net_total)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="payment-method mt-5 mb-12">
                                    <h3 className="font-bold">Choose your payment method</h3>
                                    <div className="tabs flex items-start gap-2 mt-3 flex-col">
                                        <div
                                            onClick={() => setPaymentTab("card")}
                                            className={`border p-2 transition-all ease-in-out px-4 w-full items-center justify-start flex gap-2 rounded-lg cursor-pointer hover:bg-neutral-50 ${paymentTab === "card" ? "text-sky-400 border-sky-400" : ""
                                                }`}
                                        >
                                            <Icon icon="bi:credit-card-fill" fontSize={24} />
                                            <div className="flex flex-col">
                                                <span>Credit/Debit Card</span>
                                            </div>
                                        </div>
                                        <div
                                            onClick={() => setPaymentTab("wallet")}
                                            className={`border p-2 transition-all ease-in-out px-4 w-full items-center justify-start flex gap-2 rounded-lg cursor-pointer hover:bg-neutral-50 ${paymentTab === "wallet" ? "text-sky-400 border-sky-400" : ""
                                                }`}
                                        >
                                            <Icon icon="fluent:wallet-credit-card-48-filled" fontSize={24} />
                                            <div className="flex flex-col">
                                                <span>Mobile Wallet</span>
                                                <span className="text-neutral-400 text-xs">
                                                    Vodafone, Orange, Etisalat, CIB, or any e-wallet
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <button
                                        className="main-btn mb-3 w-full font-bold flex items-center gap-1 justify-center disabled:opacity-50 disabled:hover:bg-sky-500"
                                        onClick={() => handlePayment('bundle', paymentTab)}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span>Processing...</span>
                                                <Icon icon="iconamoon:synchronize-fill" className="animate-spin" fontSize={22} />
                                            </>
                                        ) : (
                                            <>
                                                <span>Proceed to payment</span>
                                                <Icon icon="material-symbols:check-rounded" fontSize={22} />
                                            </>
                                        )}
                                    </button>
                                    <img src="/images/paymob.png" className="w-24 mx-auto" alt="Paymob" />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                }
            </AnimatePresence>
        )
    }
    return type === 'event' ? EventCheckoutRender() : type === 'workshop' ? WorkshopCheckoutRender() : BundleCheckoutRender()
}

export default CheckoutMenu