import { FocusCards } from './UI/FocusCards'

function TeamCards() {
    const cards = [
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
    return (
        <FocusCards cards={cards} />
    )
}

export default TeamCards