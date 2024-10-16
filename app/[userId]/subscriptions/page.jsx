'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubscriptions } from '../../store/slices/subscriptionsSlice'
import { formatCurrency } from '../../lib/utils'
import { Icon } from '@iconify/react'
import Loader from '../../components/Loader'


function Subsciriptions() {
    const params = useParams()
    const dispatch = useDispatch()
    const { subscriptions, loading } = useSelector(state => state.subscriptions)
    const [filteredData, setFilteredData] = useState([])
    const filters = ['all', 'events', 'workshops', 'bundles']
    const [filter, setFilter] = useState('all')

    const applyFilter = (filterData) => {
        setFilter(filterData)
        switch (filterData) {
            case "events":
                setFilteredData([...subscriptions.filter(sub => sub.event !== null)])
                break;
            case "workshops":
                setFilteredData([...subscriptions.filter(sub => sub.workshop !== null)])
                break;
            case "bundles":
                setFilteredData([...subscriptions.filter(sub => sub.bundle !== null)])
                break;
            default:
                setFilteredData([...subscriptions])
                break;
        }
    }

    useEffect(() => {
        setFilteredData([...subscriptions])
    }, [subscriptions])

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
                <div className='filters mt-5 flex items-center gap-2'>
                    {
                        filters.map((filterData, index) => (
                            <button key={index} onClick={() => applyFilter(filterData)} className={`${filter === filterData ? "main-btn border-transparent" : "alt-btn"} border py-1`}>{filterData}</button>
                        ))
                    }
                </div>
                <div className='mt-8 flex flex-col gap-3 w-full'>
                    {
                        filteredData.length > 0
                            ?
                            filteredData.map((subscribe, index) =>
                                <div key={index} className='w-full p-4 [&:not(:last-of-type)]:border-b'>
                                    <div className='mb-3'>
                                        <span className='text-xl font-bold capitalize block w-full'>{subscribe.event?.title || subscribe.workshop?.title || subscribe.bundle?.title}</span>
                                        <span className='block text-sm text-neutral-400'>{subscribe.workshop?.lecturer}</span>
                                    </div>
                                    <div className='flex items-start justify-between'>
                                        <div className='flex-col flex gap-1 w-full'>
                                            {
                                                subscribe.event &&
                                                <div className='flex items-center gap-1'>
                                                    <Icon icon='fluent:calendar-star-16-filled' fontSize={24}></Icon>
                                                    <span>Event</span>
                                                </div>
                                            }
                                            {
                                                subscribe.workshop &&
                                                <div className='flex items-center gap-1'>
                                                    <Icon icon='entypo:tools' fontSize={20}></Icon>
                                                    <span>Workshop</span>
                                                </div>
                                            }
                                            {
                                                subscribe.bundle &&
                                                <div className='flex items-center gap-1 text-neutral'>
                                                    <Icon icon='lucide:boxes' fontSize={24}></Icon>
                                                    <span>Bundle</span>
                                                </div>
                                            }
                                            <span className='text-neutral-400'>
                                                ID Code: <span className='text-lg  font-bold text-sky-400'>#{subscribe.code}</span>
                                            </span>
                                        </div>
                                        <div className='flex flex-col gap-1 items-end w-full text-end'>
                                            <span className='text-lg font-bold'>{formatCurrency.format(subscribe.amount)}</span>
                                            <div className='text-xs text-neutral-400'>
                                                <span className='block'>Subscribed at</span>
                                                <span>{new Date(subscribe.created_at).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                            :
                            <div className='grid place-items-center py-12'>
                                <h3 className='text-neutral-500'>Nothing to show</h3>
                            </div>
                    }
                </div>
            </div>
    )
}

export default Subsciriptions