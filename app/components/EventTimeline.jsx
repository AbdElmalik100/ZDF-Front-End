
import { Timeline } from './UI/Timeline'
import { motion } from 'framer-motion'
import { timelineData } from '../constants';

function EventTimeline() {

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", delay: 0.5 }}
            className='w-full'
        >
            <Timeline data={timelineData} />
        </motion.div>
    )
}

export default EventTimeline