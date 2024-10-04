import { Icon } from "@iconify/react/dist/iconify.js"
import { useRef, useState } from "react";
import { motion } from 'framer-motion'

function Testimonials() {
    const testimonials = useRef()
    const [isPaused, setIsPaused] = useState(true)

    const toggleVideo = () => {
        if (testimonials.current.paused) {
            testimonials.current.play()
            setIsPaused(false)
        } else {
            setIsPaused(true)
            testimonials.current.pause()
        }
    }

    return (
        <section className="testimonials py-32 overflow-hidden">
            <div className="container px-4 flex items-start gap-10 justify-between max-lg:flex-col-reverse">
                <motion.div
                    initial={{ x: -25, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", delay: 0.3 }}
                    className="testi-video w-full relative grid place-items-center group">
                    <button className={`absolute w-14 h-14 grid place-items-center rounded-full bg-sky-500 uppercase font-bold text-white transition-all ease-in-out z-10 ${isPaused ? 'opacity-1' : 'opacity-0 group-hover:opacity-100'}`}
                        onClick={toggleVideo}>
                        {
                            isPaused &&
                            <span className="animate-ping absolute w-10 h-10 bg-sky-600 rounded-full pointer-events-none"></span>
                        }
                        <Icon icon={isPaused ? 'material-symbols:play-arrow-rounded' : 'material-symbols:pause-rounded'} fontSize={38} />
                    </button>
                    <video ref={testimonials} className="rounded-3xl shadow-xl shadow-sky-500/25">
                        <source src='/zdf-testimonials.mp4' type="video/mp4" />
                    </video>
                </motion.div>
                <motion.div
                    initial={{ x: 25, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", delay: 0.4 }}
                    className="info w-full max-lg:text-center">
                    <h2 className="lg:text-5xl text-3xl font-bold mb-3">ZDF Event testimonials</h2>
                    <p className="lg:text-xl text-base">See what they say about Z Dental Forum first edition 2024 event @ faculty of dentistry, Zagazig university.</p>
                    <p className="lg:text-xl text-base mt-4">If you didn&apos;t attend this event, No problem you can attend the next one, We hope seeing you there.</p>
                </motion.div>
            </div>
        </section>
    )
}

export default Testimonials