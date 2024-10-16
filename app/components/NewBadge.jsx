'use client'
import moment from 'moment'

function NewBadge({workshop}) {
    return (
        moment(workshop.created_at).add("3", "days") > new Date() &&
        <div className="new w-fit grid place-items-center absolute z-20 -right-3 -top-3">
            <img src="/images/new.png" className="w-10 h-10 animate-ping absolute opacity-55" alt="New" />
            <img src="/images/new.png" className="w-16 h-16" alt="New" />
        </div>
    )
}

export default NewBadge