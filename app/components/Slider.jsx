'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion'
import SliderNavigation from './SliderNavigation'
import { sliderObject } from '../constants/index'
import Image from 'next/image';

function Slider() {

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
                    sliderObject.map((obj, index) => (
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
                            <Image priority className='w-full h-full object-cover xl:object-[100%,-30px] object-center relative' width={6000} height={4000} src={`/images/${obj.image}`} alt="" />
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