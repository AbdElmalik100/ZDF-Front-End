import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

function Tooltip() {
    return (
        <div className='tooltip relative group'>
            <Icon icon='flowbite:exclamation-circle-solid' className='cursor-pointer' fontSize={16}></Icon>
            <div className='tooltip-box rounded-2xl transition-all ease-in-out opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-neutral-800 text-white absolute top-5 -left-5 text-xs p-3 min-w-[200px]'>
                <p>This is 5% of the total price before discounts, This fee helps to continue provide a great experience.</p>
            </div>
        </div>
    )
}

export default Tooltip