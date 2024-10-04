'use client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserAvatar from '../../components/UserAvatar'
import { updateUser } from '../../store/slices/usersSlice'
import Loader from '../../components/Loader'

function Profile() {
    const dispatch = useDispatch()
    const {user, loading} = useSelector(state => state.users)
    const [tempUser, setTempUser] = useState({ ...user })
    const handleChange = (event) => {
        const { name, value } = event.target
        setTempUser({ ...tempUser, [name]: value })
    }

    const updateUserInfo = (e) => {
        e.preventDefault()
        dispatch(updateUser({ id: user._id, userData: tempUser }))
    }
    
    useEffect(() => {
        setTempUser({...user})
    }, [user])

    return (
        <div className='content p-5 bg-white shadow-md rounded-lg w-full border'>
            <h2 className='text-2xl font-bold mb-5'>Profile details</h2>
            <UserAvatar user={user} tempUser={tempUser}></UserAvatar>
            <form className='mt-5 max-md:mt-10 flex flex-col gap-5 w-full' onSubmit={updateUserInfo}>
                <div className='up flex items-center gap-3 w-full'>
                    <label className='w-full'>
                        <span className='mb-1 block'>First name</span>
                        <input type="text" name='first_name' placeholder='e.g. John' value={tempUser.first_name} onChange={handleChange} />
                    </label>
                    <label className='w-full'>
                        <span className='mb-1 block'>Last name</span>
                        <input type="text" name='last_name' placeholder='e.g. Doe' value={tempUser.last_name} onChange={handleChange} />
                    </label>
                </div>
                <div className='down flex items-center gap-3 w-full max-md:flex-col'>
                    <label className='w-full'>
                        <span className='mb-1 block'>Email address</span>
                        <div className='relative'>
                            <input type="text" name='email' placeholder='e.g. example@email.com' disabled value={tempUser.email} />
                            {
                                tempUser.is_email_verified
                                    ?
                                    <span className='absolute p-1 px-3 rounded-full z-30 text-xs bg-green-100 text-green-700 top-1/2 -translate-y-1/2 right-4'>Verified</span>
                                    :
                                    <span className='absolute p-1 px-3 rounded-full z-30 text-xs bg-rose-100 text-rose-700 top-1/2 -translate-y-1/2 right-4'>Not verified</span>
                            }
                        </div>
                    </label>
                    <label className='w-full'>
                        <span className='mb-1 block'>Phone number</span>
                        <input type="text" name='phone_number' placeholder='e.g. +2001011308220' value={tempUser.phone_number} onChange={handleChange} />
                    </label>
                </div>
                <button className='mt-5 main-btn w-fit ms-auto'>Save changes</button>
            </form>
            {
                loading && <Loader></Loader>
            }
        </div>
    )
}

export default Profile