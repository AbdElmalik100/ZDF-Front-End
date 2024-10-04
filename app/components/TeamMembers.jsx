import TeamCards from "./TeamCards";
import { motion } from 'framer-motion'


function TeamMembers() {
    return (
        <section className="team-members py-32">
            <div className="container px-4">
                <motion.div
                    initial={{ y: 25, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", delay: 0.2 }}
                >
                    <h2 className="heading max-md:text-3xl">Meet our team members</h2>
                </motion.div>
                <div className="flex items-stretch gap-4">
                    <TeamCards></TeamCards>
                </div>
            </div>
        </section>
    )
}

export default TeamMembers