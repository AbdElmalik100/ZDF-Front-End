import { Icon } from "@iconify/react/dist/iconify.js"
import { motion } from 'framer-motion'
import { useEffect, useState } from "react";
import CheckoutMenu from './CheckoutMenu'
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import ID from "./ID";
import moment from "moment";
import { formatCurrency } from "../lib/utils";

function LatestEvent() {
    const [checkout, setCheckout] = useState(false)
    const { isLoggedIn } = useSelector(state => state.users)
    const { event, loading } = useSelector(state => state.events)
    const { subscriptions } = useSelector(state => state.subscriptions)
    const [showID, setShowID] = useState(false)
    const [eventID, setEventID] = useState(null)
    const router = useRouter()

    const booking = () => {
        isLoggedIn ? setCheckout(true) : router.push("/login")
    }

    useEffect(() => {
        if (isLoggedIn) {
            const checker = subscriptions.filter(sub => sub.event?._id === event._id)[0]
            checker ? setEventID(checker) : setEventID(null)
        } else setEventID(null)
    }, [subscriptions, event, isLoggedIn])

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
                        <h3 className="heading heading md:w-2/3 w-full mx-auto max-md:text-3xl">upcoming event</h3>
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
                                                <span>{formatCurrency.format(event.ticket_price)}</span>
                                            </li>
                                        </ul>
                                        <p className="lg:mt-auto text-center mt-8">Book your ticket now before it goes out limited seats, don&apos;t miss the chance to meet our experts in Z Dental Forum event, We look forward seeing you there.</p>
                                        {
                                            eventID
                                                ?
                                                <button onClick={() => setShowID(true)} className="main-btn mt-4 w-full flex items-center bg-green-600 opacity-95 hover:bg-green-500 gap-2 font-bold justify-center">
                                                    <span>Your book details</span>
                                                </button>
                                                :
                                                event.is_available
                                                    ?
                                                    <button className="main-btn mt-4 w-full flex items-center gap-2 font-bold justify-center"
                                                        onClick={booking}>
                                                        <span>Book your ticket now</span>
                                                        <Icon icon='ion:ticket' fontSize={20}></Icon>
                                                    </button>
                                                    :
                                                    <div className="main-btn mt-4 w-full flex items-center bg-red-600 opacity-95 hover:bg-red-600 gap-2 font-bold justify-center">
                                                        <span>Event tickets soldout</span>
                                                    </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
                <ID subscriptionDetails={eventID} setShowID={setShowID} showID={showID}></ID>
                <CheckoutMenu type="event" checkout={checkout} setCheckout={setCheckout}></CheckoutMenu>
            </section>
    )
}

export default LatestEvent