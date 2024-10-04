import GooglePayButton from "@google-pay/button-react"
import { Icon } from "@iconify/react/dist/iconify.js"
import { motion } from 'framer-motion'
import { useState } from "react";
import CheckoutMenu from './CheckoutMenu'
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import moment from "moment";
import { formatCurrenct } from "../lib/utils";

function LatestEvent() {
    const [checkout, setCheckout] = useState(false)
    const { isLoggedIn } = useSelector(state => state.users)
    const { event, loading } = useSelector(state => state.events)
    const router = useRouter()
    const paymentData = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
            {
                type: 'CARD',
                parameters: {
                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                },
                tokenizationSpecification: {
                    type: 'PAYMENT_GATEWAY',
                    parameters: {
                        gateway: 'example',
                        gatewayMerchantId: 'exampleGatewayMerchantId',
                    },
                },
            },
        ],
        merchantInfo: {
            merchantId: '12345678901234567890',
            merchantName: 'Demo Merchant',
        },
        transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: '100.00',
            currencyCode: 'EGP',
            countryCode: 'EG',
        },
    }

    const booking = () => {
        isLoggedIn ? setCheckout(true) : router.push("/login")
    }


    return (
        loading || !event
            ?
            <Loader></Loader>
            :
            <section className="latest-event py-32">
                <div className="container px-4">
                    <motion.div
                        initial={{ y: 25, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ ease: "easeOut", delay: 0.5 }}
                    >
                        <h3 className="heading max-md:text-3xl">upcoming event</h3>
                    </motion.div>
                    <motion.div
                        initial={{ y: 25, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ ease: "easeOut", delay: 0.7 }}
                    >
                        <div className="event-box relative overflow-hidden rounded-3xl balls h-full">
                            <span className="separator absolute h-full border-dashed border border-neutral-50 left-[62%] -translate-x-1/2 top-0 z-20 max-lg:rotate-90 max-lg:top-10"></span>
                            <div className="overlay">
                                <img className='w-full h-full absolute left-0 top-0 -z-10 object-cover pointer-events-none' src="/images/Z Dental Forum.png" alt="" />
                                <div className="flex items-stretch gap-32 w-full h-full xl:p-20 md:p-14 p-8 lg:flex-row flex-col">
                                    <div className="left z-10 text-white lg:w-2/3 w-full">
                                        <h2 className="xl:text-5xl text-3xl font-bold capitalize">{event.title}</h2>
                                        <p className="text-base font-normal mt-4">
                                            {event.description}
                                        </p>
                                        <ul className="flex flex-col gap-5 mt-10 text-xl">
                                            {
                                                event.sessions.map((session, index) => 
                                                    <li key={index} className="flex items-center gap-2">
                                                        <Icon icon="material-symbols:check-rounded" fontSize={24} />
                                                        <span>{session}</span>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                    <div className="right z-10 text-white lg:w-1/3 w-full flex flex-col h-auto">
                                        <ul className="event-info flex flex-col gap-5">
                                            <li className="flex items-center gap-2 capitalize">
                                                <Icon icon="ic:round-location-on" fontSize={24} />
                                                <span className="flex-1">{event.venue}</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Icon icon="solar:calendar-minimalistic-bold" fontSize={24} />
                                                <span>{new Date(event.date).toLocaleDateString()}</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Icon icon="mdi:clock-time-five" fontSize={24} />
                                                <span>
                                                    {moment(event.time_from, "HH:mm:ss").format("hh:mm A")} - {moment(event.time_to, "HH:mm:ss").format("hh:mm A")}
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Icon icon="mingcute:currency-pound-fill" fontSize={24} />
                                                <span>{formatCurrenct.format(event.ticket_price)}</span>
                                            </li>
                                        </ul>
                                        <p className="lg:mt-auto text-center mt-8">Book your ticket now before it goes out limited seats, don't miss the chance to meet our experts in Z Dental Forum event, We look forward seeing you there.</p>
                                        {/* <GooglePayButton
                                        className="w-full mt-5"
                                        buttonSizeMode="fill"
                                        buttonType="book"
                                        buttonRadius={50}
                                        environment="TEST"
                                        paymentRequest={paymentData}
                                        onLoadPaymentData={paymentRequest => {
                                            console.log('load payment data', paymentRequest);
                                        }}
                                    /> */}
                                        <button className="main-btn mt-4 w-full flex items-center gap-2 font-bold justify-center"
                                            onClick={booking}>
                                            <span>Book your ticket now</span>
                                            <Icon icon='ion:ticket' fontSize={20}></Icon>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
                <CheckoutMenu checkout={checkout} setCheckout={setCheckout}></CheckoutMenu>
            </section>
    )
}

export default LatestEvent