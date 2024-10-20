'use client'

import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import Link from 'next/link'
import ZDFLogo from '../assets/images/ZDF - Z Dental Forum Black.png'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

function Payment() {
    const [isSuccess, setIsSuccess] = useState(false)
    const { isLoggedIn } = useSelector(state => state.users)
    const query = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem("PCO")) {
            if (query.get("success") === 'true') {
                setIsSuccess(true)
                const paymentData = JSON.parse(localStorage.getItem("PCO"))
                const subscriptionData = {
                    amount: paymentData.amount / 100,
                    user: paymentData.customer.id,
                    event: paymentData.type === 'event' ? paymentData.items[0].id : null,
                    workshop: paymentData.type === 'workshop' ? paymentData.items[0].id : null,
                    bundle: paymentData.type === 'bundle' ? paymentData.items[0].id : null
                }
                axios.post('api/subscriptions', subscriptionData)
                    .then(response => {
                        console.log(response.data);
                        localStorage.removeItem("PCO")
                    }).catch(error => {
                        console.log(error);
                    })
            } else setIsSuccess(false)
        } else router.push("/")
    }, [query])

    return (
        <div className='payment-accept-reject min-h-screen'>
            {
                isLoggedIn &&
                <div className="container grid place-items-center min-h-screen text-center px-4">
                    {
                        isSuccess
                            ?
                            <div className='success-box rounded-3xl border shadow-md bg-white md:p-8 px-4 py-8 md:w-[725px] w-full'>
                                <Icon icon='line-md:confirm-circle-filled' className='mb-4 mx-auto text-green-600' fontSize={150} />
                                <h3 className='text-green-600 font-bold text-2xl uppercase mb-3'>Payment success</h3>
                                <p className='text-neutral-500 md:w-5/6 w-full mx-auto md:text-xl text-base'>Thank you for your time on ZDF, Your booking operation has been recorded successfully to our databases.</p>
                                <Link href='/' className='main-btn w-fit font-bold mx-auto mt-8 flex items-center gap-2'>
                                    <Icon icon='solar:home-2-bold' fontSize={20} />
                                    <span>Back home</span>
                                </Link>
                                <Image src={ZDFLogo} width={150} height={150} className='mx-auto mt-16' alt='ZDF Logo' />
                            </div>
                            :
                            <div className='success-box rounded-3xl border shadow-md bg-white px-4 py-8 md:w-[725px] w-full'>
                                <Icon icon='line-md:close-circle-filled' className='mb-4 mx-auto text-rose-600' fontSize={150} />
                                <h3 className='text-rose-600 font-bold text-2xl uppercase mb-3'>Payment failed</h3>
                                <p className='text-neutral-500 mx-auto md:text-xl text-base'>Thank you for your time on ZDF, Unfortunately your booking operation has failed. There might be something wrong with your payment method. Try contacting your payment service provider, or just contact us.</p>
                                <div className='mt-8 flex items-center justify-center gap-3'>
                                    <Link href='/' className='main-btn font-bold w-fit flex items-center gap-2'>
                                        <Icon icon='solar:home-2-bold' fontSize={20} />
                                        <span>Back home</span>
                                    </Link>
                                    <a href="https://wa.me/+2001011308220" target='_blank' className='alt-btn font-bold flex items-center gap-2'>
                                        <Icon icon='mage:whatsapp-filled' fontSize={20} />
                                        <span>Contact us</span>
                                    </a>
                                </div>
                                <Image src={ZDFLogo} width={150} height={150} className='mx-auto mt-16' alt='ZDF Logo' />
                            </div>
                    }
                </div>
            }
        </div>
    )
}

export default Payment
