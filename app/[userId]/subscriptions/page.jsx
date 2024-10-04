'use client'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubscriptions } from '../../store/slices/subscriptionsSlice'
import { formatCurrenct } from '../../lib/utils'
import { Icon } from '@iconify/react'
import Loader from '../../components/Loader'


function Subsciriptions() {
    const params = useParams()
    const dispatch = useDispatch()
    const { subscriptions, loading } = useSelector(state => state.subscriptions)


    useEffect(() => {
        dispatch(getSubscriptions(params.userId))
    }, [dispatch])

    return (
        loading
            ?
            <Loader></Loader>
            :
            <div className='content p-4 bg-white shadow-md rounded-lg w-full'>
                <h2 className='font-bold text-2xl'>Subscriptions history</h2>
                <div className='mt-8 flex flex-col gap-3 w-full'>
                    {
                        subscriptions.map((subscribe, index) =>
                            <div key={index} className='w-full p-4 [&:not(:last-of-type)]:border-b'>
                                <span className='text-xl font-bold capitalize mb-2 block w-full'>{subscribe.event?.title}</span>
                                <div className='flex items-start justify-between'>
                                    <div className='flex-col flex gap-1 w-full'>
                                        <span>
                                            ID Code <span className='text-lg ms-1 font-bold'>#{subscribe.code}</span>
                                        </span>
                                        {
                                            subscribe.attendance
                                                ?
                                                <span className='text-sm text-green-500 flex items-center gap-1'>
                                                    <span>Attended</span>
                                                    <Icon icon="material-symbols:check-rounded" fontSize={20} />
                                                </span>
                                                :
                                                <span className='text-sm text-yellow-500 flex items-center gap-1'>
                                                    <span>Pending...</span>
                                                    <Icon icon="material-symbols:pending-actions-rounded" fontSize={20} />
                                                </span>
                                        }
                                    </div>
                                    <div className='flex flex-col gap-1 items-end w-full text-end'>
                                        <span className='text-lg font-bold'>{formatCurrenct.format(subscribe.amount)}</span>
                                        <div className='text-xs text-neutral-400'>
                                            <span className='block'>Subscribed at</span>
                                            <span>{new Date(subscribe.created_at).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
    )
}

export default Subsciriptions