'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion'
import SliderNavigation from './SliderNavigation'

function Slider() {
    const sliderObj = [
        {
            image: '95.png',
            text: "Z Dental Forum 2024, Advancing Dentistry at Zagazig University's Faculty of Dentistry"
        },
        {
            image: '1.png',
            text: "Boost Your Practice with Digital Marketing Advice from Experts"
        },
        {
            image: '97.png',
            text: "Capture Precision: Dental Photography Tips from the Pros"
        },
        {
            image: '102.png',
            text: "Revolutionizing Imaging: Learn Mobile Dental Photography from the Best"
        },
        {
            image: '103.png',
            text: "Master Advanced and Rare Dental Cases with Expert Insights"
        },
        {
            image: '105.png',
            text: "Overcome Rare Dental Challenges with Guidance from Specialists"
        },
        {
            image: '106.png',
            text: "Innovative Dental Photography Techniques from Seasoned Professionals"
        },
        {
            image: '119.png',
            text: "Embrace Digital Dentistry, Insights from Visionary Leaders"
        },
        {
            image: '120.png',
            text: "Build Stronger Patient Connections, Communication Strategies from Experts"
        },
        {
            image: '127.png',
            text: "Achieve Excellence in Patient Management with Industry Leaders"
        },
        {
            image: '130.png',
            text: "Lead the Future of Dentistry: Visionary Ideas from Expert Speakers"
        },
        {
            image: '133.png',
            text: "Future-Ready Dentistry, Embrace Digital Innovation"
        },
        {
            image: '134.png',
            text: "Mastering Complex Operative Cases, Expert Approaches to Success"
        },
        {
            image: '139.png',
            text: "Innovative Techniques in Fiber-Reinforced Composite Dentistry"
        },
    ]

    return (
        <>
            <Swiper
                className="mySwiper h-full lg:text-5xl text-xl font-bold relative"
                pagination={{ type: "progressbar" }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {
                    sliderObj.map((obj, index) => (
                        <SwiperSlide key={index}>
                            <motion.div
                                initial={{ y: 50, opacity: 0, filter: 'blur(30px)' }}
                                whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                                transition={{ ease: "easeOut", delay: 0.5 }}
                                className="absolute bottom-32 lg:left-32 left-2 lg:w-1/2 max-lg:bottom-20 w-[calc(100%-10px)] capitalize z-20"
                            >
                                <h2 className='text-white'>
                                    {obj.text}
                                </h2>
                            </motion.div>
                            <img className='w-full h-full object-cover xl:object-[100%,-30px] object-center relative' src={`/images/${obj.image}`} alt="" />
                            <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent from-50% to-100% to-sky-600/75'></div>
                        </SwiperSlide>
                    ))
                }
                <SliderNavigation></SliderNavigation>
            </Swiper>
        </>
    )
}

export default Slider