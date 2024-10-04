'use client'
import Image from 'next/image'
import logo from '../../assets/images/ZDF - Z Dental Forum Black.png'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { Icon } from '@iconify/react'
import { googleAuth } from '../../store/slices/usersSlice'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {socket} from '../../../socket'


function TheatreConfirmation() {
    const dispatch = useDispatch()
    const params = useParams()
    const { isLoggedIn, user } = useSelector(state => state.users)
    const [loading, setLoading] = useState(false)
    const [alreadySubmitted, setAlreadysubmitted] = useState(false)
    const [seatData, setSeatData] = useState({
        user: "",
        seatNumber: ""
    })

    const login = useGoogleLogin({
        onSuccess: codeResponse => {
            dispatch(googleAuth({ access_token: codeResponse.access_token, credential: "", router: "" }))
        },
        onError: error => console.log(error)
    });

    const handleChange = (e) => {
        setSeatData({
            user: user,
            seatNumber: e.target.value
        })
    }

    const submitSeatNumber = async (e) => {
        e.preventDefault()
        setLoading(true)
        await axios.patch(`api/theatres/${params.id}/seats`, seatData)
            .then(response => {
                setAlreadysubmitted(true)
                socket.emit("seat_submit", response.data.theatres)
            }).catch(error => {
                toast.error(error.response.data.error)
            }).finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        if (user) {
            setLoading(true)
            axios.post(`/api/theatres/${params.id}/seats`, user)
                .then(response => {
                    if (response.status === 200) setAlreadysubmitted(true)
                }).catch(error => {
                    console.log(error);
                }).finally(() => {
                    setLoading(false)
                })
        }
    }, [user])


    return (
        <div className='min-h-screen py-12'>
            <AnimatePresence>
                {
                    alreadySubmitted && isLoggedIn
                        ?
                        <div className="container h-screen px-4 grid place-items-center">
                            <motion.div
                                key="success"
                                initial={{ scale: 0.7, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.7, opacity: 0 }}
                                transition={{ ease: "easeOut", delay: 0.2, duration: 0.3 }}
                                className="submition-box bg-white border p-8 text-center max-w-[450px] rounded-2xl shadow-md"
                            >
                                <Icon icon='line-md:confirm-circle' fontSize={115} className='mx-auto mb-4 text-green-500' />
                                <h3 className='font-semibold text-green-700'>Thanks for your time, your ID will arrive you soon, Enjoy the event.</h3>
                                <Link href='/' className='main-btn mt-4 w-fit mx-auto flex items-center gap-2'>
                                    <span>Back home</span>
                                    <Icon icon='solar:home-2-bold' fontSize={20} />
                                </Link>
                            </motion.div>
                        </div>
                        :
                        <div className="container h-screen px-4 grid place-items-center">
                            {
                                isLoggedIn
                                    ?
                                    <motion.div
                                        key="input-box"
                                        initial={{ scale: 0.7, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.7, opacity: 0 }}
                                        transition={{ ease: "easeOut", delay: 0.2, duration: 0.3 }}
                                    >
                                        <form className='input-box p-8 rounded-2xl max-w-[450px] mx-auto border bg-white shadow-md text-center' onSubmit={submitSeatNumber}>
                                            <Image src={logo} width={200} className='mb-8 mx-auto' alt="ZDF Logo"></Image>
                                            <h2 className='font-bold mb-8'>Please insert your seat number here, Stay on your seat your ID will come to you.</h2>
                                            <input type="number" className='rounded-lg p-2 px-4' placeholder='Your seat number' onChange={handleChange} />
                                            <button disabled={loading} className={`main-btn font-bold flex items-center justify-center gap-2 w-full mt-4 ${loading ? 'hover:bg-sky-500 opacity-50' : ''}`}>
                                                {
                                                    loading
                                                        ?
                                                        <span className='flex items-center gap-1'>
                                                            <Icon className=' animate-spin' icon='flowbite:refresh-outline' fontSize={24} />
                                                            Loading...
                                                        </span>
                                                        :
                                                        <span>Submit</span>
                                                }
                                            </button>
                                        </form>
                                    </motion.div>
                                    :
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
                            }
                        </div>
                }
            </AnimatePresence>
        </div>
    )
}

export default TheatreConfirmation