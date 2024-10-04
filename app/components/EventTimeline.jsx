
import Image from 'next/image';
import { Timeline } from './UI/Timeline'
import { motion } from 'framer-motion'

function EventTimeline() {
    const data = [
        {
            title: "10:00AM - 10:05AM",
            content: (
                <div>
                    <h3 className="text-neutral-800 text-md md:text-xl font-semibold mb-8">
                        Event intro 5 minutes
                    </h3>
                </div>
            ),
        },
        {
            title: "10:10AM - 10:40AM",
            content: (
                <div>
                    <p className="text-neutral-800 text-md md:text-xl font-semibold mb-2">
                        Seassion Restorative (Dental Talk 2 Cases)
                    </p>
                    <p className="text-neutral-500 text-xs md:text-base font-normal mb-8">
                        By DR.Moaz Ebrahem & DR.Mariam Elsaid
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <Image
                            src="/images/moaz.jpg"
                            alt="hero template"
                            width={500}
                            height={500}
                            className="rounded-lg object-cover object-[0%,25%] md:h-[450px] h-auto w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                        <Image
                            src="/images/mariam.jpg"
                            alt="feature template"
                            width={500}
                            height={500}
                            className="rounded-lg object-cover object-[0%,25%] md:h-[450px] h-auto w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "10:45AM - 11:30AM",
            content: (
                <div>
                    <p className="text-neutral-800 text-md md:text-xl font-semibold mb-2">
                        Mastering the art of presentation skills - Tips & tricks with AI implemented
                    </p>
                    <p className="text-neutral-500 text-xs md:text-base font-normal mb-8">
                        By DR.Nourhan Samy
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                        <Image
                            src="https://assets.aceternity.com/pro/hero-sections.png"
                            alt="hero template"
                            width={500}
                            height={500}
                            className="rounded-lg object-cover object-[0%,25%] md:h-[450px] h-auto w-96 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "10:45AM - 11:30AM",
            content: (
                <div>
                    <p className="text-neutral-800 text-md md:text-xl font-semibold mb-2">
                        Patient Management
                    </p>
                    <p className="text-neutral-500 text-xs md:text-base font-normal mb-8">
                        By DR.Zaina Bayoumy & DR.Rawan Mohamed
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <Image
                            src="https://assets.aceternity.com/pro/hero-sections.png"
                            alt="hero template"
                            width={500}
                            height={500}
                            className="rounded-lg object-cover object-[0%,25%] md:h-[450px] h-auto w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                        <Image
                            src="https://assets.aceternity.com/pro/hero-sections.png"
                            alt="hero template"
                            width={500}
                            height={500}
                            className="rounded-lg object-cover object-[0%,25%] md:h-[450px] h-auto w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "11:35AM - 12:30PM",
            content: (
                <div>
                    <p className="text-neutral-800 text-md md:text-xl font-semibold mb-2">
                        Lunch Break
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                        <Image
                            src="/images/Coffee Break.png"
                            alt="hero template"
                            width={500}
                            height={500}
                            className="rounded-lg object-cover object-[0%,25%] h-auto w-96 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "12:35AM - 01:05PM",
            content: (
                <div>
                    <p className="text-neutral-800 text-md md:text-xl font-semibold mb-2">
                        Dental Photography
                    </p>
                    <p className="text-neutral-500 text-xs md:text-base font-normal mb-8">
                        By ENG.Abdallah Essam
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                        <Image
                            src="/images/abdallah.jpg"
                            alt="hero template"
                            width={500}
                            height={500}
                            className="rounded-lg object-cover object-[0%,25%] h-auto w-96 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "01:10AM - 01:30PM",
            content: (
                <div>
                    <p className="text-neutral-800 text-md md:text-xl font-semibold mb-2">
                        Mobile Dental Photography
                    </p>
                    <p className="text-neutral-500 text-xs md:text-base font-normal mb-8">
                        By DR.Assem Mahdy
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                        <Image
                            src="/images/assem.jpg"
                            alt="hero template"
                            width={500}
                            height={500}
                            className="rounded-lg object-cover object-[0%,25%] h-auto w-96 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "01:35AM - 02:05PM",
            content: (
                <div>
                    <p className="text-neutral-800 text-md md:text-xl font-semibold mb-2">
                        Documentation & Digital Marketing
                    </p>
                    <p className="text-neutral-500 text-xs md:text-base font-normal mb-8">
                        By DR.Mohamed Hatem
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                        <Image
                            src="/images/hatem.jpg"
                            alt="hero template"
                            width={500}
                            height={500}
                            className="rounded-lg object-cover object-[0%,25%] h-auto w-96 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                    </div>
                </div>
            ),
        },
    ];
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", delay: 0.5 }}
            className='w-full'
        >
            <Timeline data={data} />
        </motion.div>
    )
}

export default EventTimeline