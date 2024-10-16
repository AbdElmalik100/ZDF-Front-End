import { useClickAway } from '@uidotdev/usehooks'
import React from 'react'
import ZDFLogo from '../assets/images/ZDF - Z Dental Forum Black.png'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { AnimatePresence, motion } from 'framer-motion'

function ID({ subscriptionDetails, showID, setShowID }) {
    const idRef = useClickAway(() => {
        setShowID(false)
    })
    return (
        <AnimatePresence>
            {
                showID &&
                <motion.div
                    key={"ID-overlay"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ ease: "easeOut", duration: 0.1 }}
                    className='overlay top-0 left-0 fixed w-full h-full z-[999999] grid place-items-center'>
                    {
                        subscriptionDetails &&
                        <motion.div
                            key={"ID"}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ ease: "easeOut", duration: 0.2 }}
                            ref={idRef} className='id relative bg-white z-10 shadow-md p-5 py-12 rounded-3xl md:w-[400px] w-[calc(100%-15px)] text-center'>
                            <Icon icon="iconoir:xmark" className="ms-auto cursor-pointer absolute top-3 right-3" fontSize={35} onClick={() => setShowID(false)}></Icon>

                            <img src={subscriptionDetails.user.avatar} className='rounded-full w-64 mx-auto' alt="User avatar" />
                            <span className='font-medium text-2xl text-sky-400 mt-1 block absolute top-5 left-5'>#{subscriptionDetails.code}</span>
                            <h3 className='font-bold uppercase text-2xl mt-2'>{subscriptionDetails.user.first_name} <br /> {subscriptionDetails.user.last_name}</h3>
                            <span className='block mt-4 capitalize font-bold text-xl'>{subscriptionDetails.event.title}</span>
                            <span className='uppercase block mt-1'>Attendant</span>
                            <Image src={ZDFLogo} className='mx-auto mt-8 w-32' alt="ZDF Logo" />
                        </motion.div>
                    }
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default ID