'use client'
import { Icon } from '@iconify/react/dist/iconify.js'
import axios from 'axios'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { useGoogleLogin } from '@react-oauth/google'
import logo from '../../assets/images/ZDF - Z Dental Forum Black.png'
import Image from 'next/image'
import { googleAuth } from '../../store/slices/usersSlice'
import { socket } from '../../../socket'

function EventAttendance() {
    const query = useSearchParams()
    const { user, isLoggedIn } = useSelector(state => state.users)
    const [loading, setLoading] = useState(false)
    const [alreadySubmitted, setAlreadySubmitted] = useState(false)
    const dispatch = useDispatch()

    const login = useGoogleLogin({
        onSuccess: codeResponse => {
            dispatch(googleAuth({ access_token: codeResponse.access_token, credential: "", router: "" }))
        },
        onError: error => console.log(error)
    });



    useEffect(() => {
        if (isLoggedIn) console.log(query.get("event"));

        if (isLoggedIn) {
            setLoading(true)
            axios.post(`api/subscriptions/${query.get("event")}/attendance`, user)
                .then(response => {
                    setAlreadySubmitted(false)
                    socket.emit("event_attendance", response.data)
                }).catch(error => {
                    console.log(error);
                    setAlreadySubmitted(true)
                }).finally(() => {
                    setLoading(false)
                })
        }
    }, [isLoggedIn])

    return (
        <div className="min-h-screen py-12">
            {
                !isLoggedIn
                    ?
                    <div className="container h-screen px-4 grid place-items-center" >
                        <motion.div
                            key="google-login"
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.7, opacity: 0 }}
                            transition={{ ease: "easeOut", delay: 0.2, duration: 0.3 }}
                            className='flex flex-col gap-3 md:max-w-[400px] w-full text-center'
                        >
                            <Image src={logo} width={200} className='mb-4 mx-auto' alt="ZDF Logo"></Image>
                            <h3 className='text-xl font-bold'>Please login first to continue.</h3>
                            <button onClick={() => login()} className="flex text-black items-center w-full justify-center gap-3 p-3 rounded-lg border transition-all ease-in-out hover:bg-black hover:text-white">
                                <Icon icon='logos:google-icon' fontSize={24}></Icon>
                                <span>Continue with google</span>
                            </button>
                        </motion.div>
                    </div>
                    :
                    loading
                        ?
                        <Loader></Loader>
                        :
                        <div className="container h-screen px-4 grid place-items-center">
                            <motion.div
                                key="success"
                                initial={{ scale: 0.7, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.7, opacity: 0 }}
                                transition={{ ease: "easeOut", delay: 0.2, duration: 0.3 }}
                                className="submition-box bg-white border p-8 text-center max-w-[450px] rounded-2xl shadow-md"
                            >
                                <Icon icon={alreadySubmitted ? 'line-md:close-circle' : 'line-md:confirm-circle'} fontSize={115} className={`mx-auto mb-4 ${alreadySubmitted ? 'text-rose-500' : 'text-green-500'}`} />
                                <h3 className={`font-semibold ${alreadySubmitted ? "text-rose-700" : "text-green-700"}`}>
                                    {
                                        alreadySubmitted ? "Your have already submitted your attendance before!" : "Thanks for your time, your attendance has been checked out, Enjoy the event."
                                    }
                                </h3>
                                <Link href='/' className='main-btn mt-4 w-fit mx-auto flex items-center gap-2'>
                                    <span>Back home</span>
                                    <Icon icon='solar:home-2-bold' fontSize={20} />
                                </Link>
                            </motion.div>
                        </div>
            }
        </div>
    )
}

export default EventAttendance