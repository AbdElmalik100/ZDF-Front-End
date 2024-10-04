import { Icon } from '@iconify/react';
import { useSwiper } from 'swiper/react';

function SliderNavigation() {
    const swiper = useSwiper()

    return (
        <div className='slider-nav text-neutral-300'>
            <button
                onClick={() => swiper.slidePrev()}
                className='prev absolute z-10 left-10 top-1/2 transition-all ease-in-out -translate-y-1/2 w-14 h-14 grid place-items-center rounded-full border border-neutral-300 hover:border-white hover:text-white'>
                <Icon icon='ic:round-arrow-right-alt' className='rotate-180' fontSize={34}></Icon>
            </button>
            <button
                onClick={() => swiper.slideNext()}
                className='next absolute z-10 right-10 top-1/2 transition-all ease-in-out -translate-y-1/2 w-14 h-14 grid place-items-center rounded-full border border-neutral-300 hover:border-white hover:text-white'>
                <Icon icon='ic:round-arrow-right-alt' fontSize={34}></Icon>
            </button>
        </div>
    )
}

export default SliderNavigation