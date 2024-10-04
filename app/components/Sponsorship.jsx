import { motion } from 'framer-motion'
import GVBlack from '../assets/images/GV Black.png'
import GlobalDental from '../assets/images/Global.png'
import Image from "next/image";

function Sponsorship() {
    return (
        <section className="sponsorship py-32 flex items-center gap-12 justify-center">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ ease: "easeOut", duration: 0.4 }}
            >
                <Image src={GVBlack} width={125} alt="GVBlack"></Image>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ ease: "easeOut", duration: 0.4 }}
            >
                <Image src={GlobalDental} width={100} alt="Global Dental"></Image>
            </motion.div>
        </section>
    )
}

export default Sponsorship