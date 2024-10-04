'use client'
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickAway } from '@uidotdev/usehooks'
import { startCardProcess, startWalletProcess } from "paymob-react"; // Import the startWalletProcess function
import { useSelector } from 'react-redux'
import moment from 'moment'
import { formatCurrenct } from '../lib/utils'


function CheckoutMenu({ checkout, setCheckout }) {
    const { event } = useSelector(state => state.events)
    const { user } = useSelector(state => state.users)
    const [eventData, setEventData] = useState({ ...event })
    const [paymentTab, setPaymentTab] = useState('card')
    const [phoneNumber, setPhoneNumber] = useState("")
    const checkoutRef = useClickAway(() => {
        setCheckout(false)
    })
    const [loading, setLoading] = useState(false)

    const cardPaymentDetails = {
        amount: eventData.net_total, // Replace with the amount in your currency (e.g., 1000 for 10.00 EGP)
        currency: "EGP", // Replace with your currency code (e.g., "EGP" for Egyptian Pound)
        courseTitle: eventData.title, // Replace with the name of your product or course
        courseDescription: eventData.description, // Replace with the description of your product or course
        firstName: user?.first_name, // Replace with the first name of the customer
        lastName: user?.last_name, // Replace with the last name of the customer
        email: user?.email, // Replace with the email address of the customer
        phoneNumber: user?.phone_number || "+2001011308220", // Replace with the phone number of the customer (including country code)
        userId: user?._id, // Replace with a unique identifier for the customer (e.g., user ID)
        courseId: eventData._id, // Replace with a unique identifier for the course or product
        paymobApiKey: process.env.NEXT_PUBLIC_PAYMOB_API_KEY, // Replace with your Paymob API key
        cardIntegrationId: 4842484, // Replace with the ID of your card integration
        iframeId: 871307, // Replace with the ID of your iframe
    };

    // Define payment details for wallet payment
    const walletPaymentDetails = {
        amount: eventData.net_total, // Replace with the amount in your currency (e.g., 1000 for 10.00 EGP)
        currency: "EGP", // Replace with your currency code (e.g., "EGP" for Egyptian Pound)
        courseTitle: eventData.title, // Replace with the name of your product or course
        courseDescription: eventData.description, // Replace with the description of your product or course
        firstName: user?.first_name, // Replace with the first name of the customer
        lastName: user?.last_name, // Replace with the last name of the customer
        email: user?.email, // Replace with the email address of the customer
        phoneNumber: user?.phone_number || "+2001011308220", // Replace with the phone number of the customer (including country code)
        userId: user?._id, // Replace with a unique identifier for the customer (e.g., user ID)
        courseId: eventData._id, // Replace with a unique identifier for the course or product
        paymobApiKey: process.env.NEXT_PUBLIC_PAYMOB_API_KEY, // Replace with your Paymob API key
        walletIntegrationId: 4842487, // Replace with the ID of your wallet integration
        iframeId: 871307, // Replace with the ID of your iframe
        mobileNumber: "01011308220", // Replace with the mobile number associated with the wallet
    };

    // Function to handle card payment
    const handleCardPayment = async () => {
        try {
            // Start the card payment process
            setLoading(true)
            await startCardProcess(...Object.values(cardPaymentDetails));
            console.log("Card payment process started successfully.");
        } catch (error) {
            setLoading(false)
            console.error("Error starting card payment process:", error);
        }
    };

    // Function to handle wallet payment
    const handleWalletPayment = async () => {
        try {
            // Start the wallet payment process
            setLoading(true)
            const finalData = { ...walletPaymentDetails, mobileNumber: phoneNumber }
            await startWalletProcess(...Object.values(finalData));
            console.log("Wallet payment process started successfully.");
        } catch (error) {
            setLoading(false)
            console.error("Error starting wallet payment process:", error);
        }
    };

    const handlePayment = () => {
        if (paymentTab === 'card') {
            handleCardPayment()
        } else {
            handleWalletPayment()
        }
    }


    useEffect(() => {
        checkout ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible"
        setPaymentTab("card")
        setPhoneNumber("")
        setEventData({ ...eventData, tax: 20, net_total: +eventData.ticket_price + 20 })
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
                        className="checkout-menu bg-white p-5 absolute right-0 top-0 h-full w-[350px] max-md:w-full flex flex-col"
                    >
                        <div className="close">
                            <Icon icon="iconoir:xmark" className="ms-auto cursor-pointer" fontSize={35} onClick={() => setCheckout(false)}></Icon>
                        </div>
                        <div className="mt-3 h-full flex flex-col">
                            <img className='w-full rounded-xl object-cover' src="/images/Z Dental Forum.png" alt="" />
                            <div className="info mt-2">
                                <h2 className="text-xl font-bold capitalize">{eventData.title}</h2>
                                <ul className="event-info flex flex-col text-sm mt-3 gap-3">
                                    <li className="flex items-center gap-2">
                                        <Icon icon="ic:round-location-on" fontSize={20} />
                                        <span className="flex-1">{eventData.venue}</span>
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
                                        <span>{formatCurrenct.format(eventData.ticket_price)}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span>Tax</span>
                                        <span>{formatCurrenct.format(eventData.tax)}</span>
                                    </div>
                                    <div className="mt-2 pt-2 border-t font-bold text-xl text-neutral-950 flex items-center justify-between gap-2">
                                        <span>Total</span>
                                        <span>{formatCurrenct.format(eventData.net_total)}</span>
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

export default CheckoutMenu