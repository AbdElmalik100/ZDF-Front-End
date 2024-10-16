'use client'
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickAway } from '@uidotdev/usehooks'
import { startCardProcess, startWalletProcess } from "paymob-react"; // Import the startWalletProcess function
import { useSelector } from 'react-redux'
import moment from 'moment'
import { formatCurrency } from '../lib/utils'
import Tooltip from '../components/Tooltip'


function CheckoutMenu({ checkout, setCheckout, type, workshop, bundle }) {


    const EventCheckoutRender = () => {
        const { event } = useSelector(state => state.events)
        const { user } = useSelector(state => state.users)
        const [eventData, setEventData] = useState({ ...event })
        const [paymentTab, setPaymentTab] = useState('card')
        const [phoneNumber, setPhoneNumber] = useState("")
        const checkoutRef = useClickAway(() => {
            setCheckout(false)
        })
        const [loading, setLoading] = useState(false)

        const generatePaymentDetails = (type) => {
            return {
                amount: eventData.net_total,
                currency: "EGP",
                courseTitle: eventData.title,
                courseDescription: eventData.description,
                firstName: user?.first_name,
                lastName: user?.last_name,
                email: user?.email,
                phoneNumber: user?.phone_number || "+2001011308220",
                userId: user?._id,
                courseId: eventData._id,
                paymobApiKey: process.env.NEXT_PUBLIC_PAYMOB_API_KEY,
                ...(type === 'card' ? { cardIntegrationId: 4842484, iframeId: 871307 } : { walletIntegrationId: 4842487, iframeId: 871307, mobileNumber: phoneNumber }),
            };
        }


        const handlePayment = async () => {
            try {
                setLoading(true);
                const paymentDetails = generatePaymentDetails(paymentTab);
                localStorage.setItem("PCO", JSON.stringify({ ...paymentDetails, type: "workshop" }));
        
                if (paymentTab === 'card') {
                    await startCardProcess(...Object.values(paymentDetails));
                } else {
                    await startWalletProcess(...Object.values(paymentDetails));
                }
        
                console.log(`${paymentTab} payment process started successfully.`);
            } catch (error) {
                setLoading(false);
                console.error(`Error starting ${paymentTab} payment process:`, error);
            }
        };


        useEffect(() => {
            const tax = ((eventData.ticket_price * 5) / 100)
            checkout ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible"
            setPaymentTab("card")
            setPhoneNumber("")
            setEventData({ ...eventData, tax: tax, net_total: +eventData.ticket_price + tax })
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
                            className="checkout-menu bg-white p-5 absolute right-0 top-0 h-full w-[375px] max-md:w-full flex flex-col"
                        >
                            <div className="close">
                                <Icon icon="iconoir:xmark" className="ms-auto cursor-pointer" fontSize={35} onClick={() => setCheckout(false)}></Icon>
                            </div>
                            <div className="mt-3 h-full flex flex-col">
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
                                <div className="payment-method mt-5">
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
                                    {
                                        paymentTab === "wallet" &&
                                        <div className="mt-4">
                                            <label>
                                                <span className="block mb-1">Phone Number</span>
                                                <input type="tel"
                                                    placeholder="Your phone number"
                                                    name="phone_number"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                    }
                                </div>
                                <div className="mt-auto">
                                    <button className="main-btn mb-3 w-full font-bold flex items-center gap-1 justify-center disabled:opacity-50 disabled:hover:bg-sky-500"
                                        onClick={handlePayment}
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
        const [phoneNumber, setPhoneNumber] = useState("")
        const checkoutRef = useClickAway(() => {
            setCheckout(false)
        })
        const [loading, setLoading] = useState(false)


        const generatePaymentDetails = (type) => {
            return {
                amount: workshopData.net_total,
                currency: "EGP",
                courseTitle: workshopData.title,
                courseDescription: workshopData.description,
                firstName: user?.first_name,
                lastName: user?.last_name,
                email: user?.email,
                phoneNumber: user?.phone_number || "+2001011308220",
                userId: user?._id,
                courseId: workshopData._id,
                paymobApiKey: process.env.NEXT_PUBLIC_PAYMOB_API_KEY,
                ...(type === 'card' ? { cardIntegrationId: 4842484, iframeId: 871307 } : { walletIntegrationId: 4842487, iframeId: 871307, mobileNumber: phoneNumber }),
            };
        }


        const handlePayment = async () => {
            try {
                setLoading(true);
                const paymentDetails = generatePaymentDetails(paymentTab);
                localStorage.setItem("PCO", JSON.stringify({ ...paymentDetails, type: "workshop" }));
        
                if (paymentTab === 'card') {
                    await startCardProcess(...Object.values(paymentDetails));
                } else {
                    await startWalletProcess(...Object.values(paymentDetails));
                }
        
                console.log(`${paymentTab} payment process started successfully.`);
            } catch (error) {
                setLoading(false);
                console.error(`Error starting ${paymentTab} payment process:`, error);
            }
        };
        

        useEffect(() => {            
            const tax = ((5 * workshop.price) / 100)
            const totalCalcualtion = (workshop.price - ((workshop.price * workshop.discount) / 100)) + tax
            checkout ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible"
            setPaymentTab("card")
            setPhoneNumber("")
            setWorkshopData({ ...workshop, tax: tax, net_total: totalCalcualtion })
            
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
                                    {paymentTab === "wallet" && (
                                        <div className="mt-4">
                                            <label>
                                                <span className="block mb-1">Phone Number</span>
                                                <input
                                                    type="tel"
                                                    placeholder="Your phone number"
                                                    name="phone_number"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-auto">
                                    <button
                                        className="main-btn mb-3 w-full font-bold flex items-center gap-1 justify-center disabled:opacity-50 disabled:hover:bg-sky-500"
                                        onClick={handlePayment}
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
        const [phoneNumber, setPhoneNumber] = useState("")
        const checkoutRef = useClickAway(() => {
            setCheckout(false)
        })
        const [loading, setLoading] = useState(false)

        const generatePaymentDetails = (type) => {
            return {
                amount: bundleData.net_total,
                currency: "EGP",
                courseTitle: bundleData.title,
                courseDescription: bundleData.title,
                firstName: user?.first_name,
                lastName: user?.last_name,
                email: user?.email,
                phoneNumber: user?.phone_number || "+2001011308220",
                userId: user?._id,
                courseId: bundleData._id,
                paymobApiKey: process.env.NEXT_PUBLIC_PAYMOB_API_KEY,
                ...(type === 'card' ? { cardIntegrationId: 4842484, iframeId: 871307 } : { walletIntegrationId: 4842487, iframeId: 871307, mobileNumber: phoneNumber }),
            };
        }


        const handlePayment = async () => {
            try {
                setLoading(true);
                const paymentDetails = generatePaymentDetails(paymentTab);
                localStorage.setItem("PCO", JSON.stringify({ ...paymentDetails, type: "workshop" }));
        
                if (paymentTab === 'card') {
                    await startCardProcess(...Object.values(paymentDetails));
                } else {
                    await startWalletProcess(...Object.values(paymentDetails));
                }
        
                console.log(`${paymentTab} payment process started successfully.`);
            } catch (error) {
                setLoading(false);
                console.error(`Error starting ${paymentTab} payment process:`, error);
            }
        };


        useEffect(() => {
            const tax = ((5 * bundle.price) / 100)            
            const totalCalcualtion = +bundle.price + tax
            checkout ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible"
            setPaymentTab("card")
            setPhoneNumber("")
            setBundleData({ ...bundle, tax: tax, net_total: totalCalcualtion })            
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
                                    {paymentTab === "wallet" && (
                                        <div className="mt-4">
                                            <label>
                                                <span className="block mb-1">Phone Number</span>
                                                <input
                                                    type="tel"
                                                    placeholder="Your phone number"
                                                    name="phone_number"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-auto">
                                    <button
                                        className="main-btn mb-3 w-full font-bold flex items-center gap-1 justify-center disabled:opacity-50 disabled:hover:bg-sky-500"
                                        onClick={handlePayment}
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