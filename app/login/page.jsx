'use client'
import Image from "next/image"
import ZDFLogo from '../assets/images/ZDF - Z Dental Forum Black.png'
import { useGoogleLogin } from '@react-oauth/google';
import { Icon } from "@iconify/react";
import Link from "next/link";
// import { GlobeDemo } from '../components/Global'
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { googleAuth } from "../store/slices/usersSlice";
import { useRouter } from "next/navigation";


function Login() {
    const dispatch = useDispatch()
    const router = useRouter()

    const login = useGoogleLogin({
        onSuccess: codeResponse => {
            dispatch(googleAuth({ access_token: codeResponse.access_token, credential: "", router }))
        },
        onError: error => console.log(error)
    });
    return (
        <main className="min-h-screen flex login overflow-hidden max-lg:flex-col-reverse">
            <motion.div
                initial={{ opacity: 0, filter: 'blur(15px)' }}
                transition={{ ease: "easeOut", delay: 1 }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                className="login-box lg:w-1/3 xl:w-1/4 w-full max-lg:flex-1 grid place-items-center"
            >
                <div className="flex flex-col gap-3 text-center h-full p-5 py-8 justify-center">
                    <Link href='/' className="self-center mb-auto">
                        <Image src={ZDFLogo} width={125} alt="ZDF Logo"></Image>
                    </Link>
                    <h3 className="text-3xl font-bold mt-5">Welcome to Z Dental Forum</h3>
                    <p className="text-neutral-700 mb-5">Login into your account to see our features, and join our events</p>
                    <button onClick={() => login()} className="flex text-black items-center justify-center gap-3 p-3 rounded-lg border transition-all ease-in-out hover:bg-black hover:text-white">
                        <Icon icon='logos:google-icon' fontSize={20}></Icon>
                        <span>Continue with google</span>
                    </button>
                    <div className="flex items-center gap-3 justify-center text-sm mt-auto">
                        <Link href='/privacy' className="underline hover:no-underline">Privacy policy</Link>
                        <span className="dot w-1 h-1 block rounded-full bg-neutral-800"></span>
                        <Link href='/terms-and-conditions' className="underline hover:no-underline">Terms & Conditions</Link>
                    </div>
                </div>
            </motion.div>
            <div className="illustration relative w-full lg:h-screen h-[32vh] overflow-hidden bg-gradient-to-br from-sky-950 to-sky-700">
                <div className="lg:absolute lg:left-14 lg:top-14 z-30 relative h-100 max-lg:mt-10">
                    <motion.div
                        initial={{ x: -25, opacity: 0 }}
                        transition={{ ease: "easeOut", delay: 1 }}
                        animate={{ x: 0, opacity: 1 }}
                    >
                        <h1 className="lg:text-6xl max-lg:text-center text-2xl bg-gradient-to-b from-white to-white/85 bg-clip-text text-transparent font-bold lg:w-3/4 w-full">Join us to see our professional speakers in the new era of dentistry.</h1>
                    </motion.div>
                </div>
                {/* <GlobeDemo></GlobeDemo> */}
            </div>
        </main >
    )
}

export default Login