import Image from 'next/image';

export const sliderObject = [
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

export const timelineData = [
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
                        className="rounded-lg object-cover object-[50%,25%] md:h-[450px] h-auto w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                    <Image
                        src="/images/mariam.jpg"
                        alt="feature template"
                        width={500}
                        height={500}
                        className="rounded-lg object-cover object-[50%,25%] md:h-[450px] h-auto w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
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
                {/* <div className="grid grid-cols-1 gap-4">
                    <Image
                        src="https://assets.aceternity.com/pro/hero-sections.png"
                        alt="hero template"
                        width={500}
                        height={500}
                        className="rounded-lg object-cover object-[50%,25%] md:h-[450px] h-auto w-96 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                </div> */}
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
                {/* <div className="grid grid-cols-2 gap-4">
                    <Image
                        src="https://assets.aceternity.com/pro/hero-sections.png"
                        alt="hero template"
                        width={500}
                        height={500}
                        className="rounded-lg object-cover object-[50%,25%] md:h-[450px] h-auto w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                    <Image
                        src="https://assets.aceternity.com/pro/hero-sections.png"
                        alt="hero template"
                        width={500}
                        height={500}
                        className="rounded-lg object-cover object-[50%,25%] md:h-[450px] h-auto w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                </div> */}
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
                        className="rounded-lg object-cover object-[50%,25%] h-auto w-96 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
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
                        className="rounded-lg object-cover object-[550%,25%] h-auto w-96 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
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
                        className="rounded-lg object-cover object-[50%,25%] h-auto w-96 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
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
                        className="rounded-lg object-cover object-[50%,25%] h-auto w-96 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                </div>
            </div>
        ),
    },
];


export const teamCards = [
    {
        name: "Moaz Ebrahem",
        title: "Founder of ZDF",
        src: "/images/moaz.jpg",
        socials: [
            {
                src: 'https://www.facebook.com/moaz.ebrahim.52',
                icon: 'ion:social-facebook'
            },
            {
                src: 'https://www.instagram.com/_moaz_ebrahim_/',
                icon: 'ph:instagram-logo-fill'
            },
            {
                src: 'https://x.com/moaz_ebrahim',
                icon: 'ri:twitter-x-fill'
            },

        ],
    },
    {
        name: "Assem Mahdy",
        title: "Co-Founder of ZDF",
        src: "/images/assem.jpg",
        socials: [
            {
                src: 'https://www.facebook.com/assem.mahdy.35',
                icon: 'ion:social-facebook'
            },
            {
                src: 'https://www.instagram.com/assem_mahdy/',
                icon: 'ph:instagram-logo-fill'
            },
            {
                src: 'https://x.com/_ASSEMMAHDY_',
                icon: 'ri:twitter-x-fill'
            },
        ],
    },
    {
        name: "Abd Elmalik Abd Elghafar",
        title: "Software Engineer & Full Stack Web Developer @ ZDF",
        src: "/images/abdelmalik.jpg",
        socials: [
            {
                src: 'https://www.facebook.com/abdelmalik.abdelghafar',
                icon: 'ion:social-facebook'
            },
            {
                src: 'https://www.instagram.com/abdelmalik.abdelghafar',
                icon: 'ph:instagram-logo-fill'
            },
            {
                src: 'https://x.com/Abd_elmalik_',
                icon: 'ri:twitter-x-fill'
            },
            {
                src: 'https://linkedin.com/in/abd-elmalik-abd-elghafar',
                icon: 'akar-icons:linkedin-fill'
            },
            {
                src: 'https://github.com/AbdElmalik100',
                icon: 'tabler:brand-github-filled'
            },
            {
                src: 'https://abdelmalik.netlify.app/',
                icon: 'bi:globe'
            },
        ],
    },
    {
        name: "Elham Eljammal",
        title: "Presenter @ ZDF",
        src: "/images/elham.jpg",
        socials: [
            {
                src: 'https://www.facebook.com/elham.eljammal.1',
                icon: 'ion:social-facebook'
            },
        ],
    },
    {
        name: "Mariam Elsaid",
        title: "Operative speaker @ ZDF",
        src: "/images/mariam.jpg",
        socials: [
            {
                src: 'https://www.facebook.com/mariam.elsaid.397',
                icon: 'ion:social-facebook'
            },
            {
                src: 'https://www.instagram.com/mariam.elsaid_/',
                icon: 'ph:instagram-logo-fill'
            },
        ],
    },
    {
        name: "Mohamed Hatem",
        title: "Digital marketing speaker @ ZDF",
        src: "/images/hatem.jpg",
        socials: [
            {
                src: 'https://www.facebook.com/MMohamedhatem1',
                icon: 'ion:social-facebook'
            },
            {
                src: 'https://www.instagram.com/mohamedhatemedits/',
                icon: 'ph:instagram-logo-fill'
            },
        ],
    },
    {
        name: "Abdallah Essam",
        title: "Dental photography speaker @ ZDF",
        src: "/images/abdallah.jpg",
        socials: [
            {
                src: 'https://www.facebook.com/profile.php?id=100084273623642',
                icon: 'ion:social-facebook'
            },
            {
                src: 'https://www.instagram.com/_abdallah.essam/',
                icon: 'ph:instagram-logo-fill'
            },
            {
                src: 'https://x.com/_ASSEMMAHDY_',
                icon: 'ri:twitter-x-fill'
            },
        ],
    },
    {
        name: "Abd Elhamed Abd Elghafar",
        title: "Media production @ ZDF",
        src: "/images/abdelhamed.jpg",
        socials: [
            {
                src: 'https://www.facebook.com/AbdElhamed2004',
                icon: 'ion:social-facebook'
            },
            {
                src: 'https://www.instagram.com/abdelhamed.cr2/',
                icon: 'ph:instagram-logo-fill'
            },
        ],
    },
];