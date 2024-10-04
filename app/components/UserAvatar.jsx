import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateProfilePicture, updateUser } from '../store/slices/usersSlice'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickAway } from '@uidotdev/usehooks'


function UserAvatar({ user, tempUser }) {
    const defaultImages = ['dental_1.png', 'dental_2.png', 'dental_3.png', 'dental_4.png', 'dental_5.png', 'dental_6.png']
    const [selectedImage, setSelectedImage] = useState(null)
    const [fileInput, setFileInput] = useState(null)
    const [openAvatarPopup, setOpenAvatarPopup] = useState(false)
    const ref = useClickAway(() => {
        closePopup()
    })
    const dispatch = useDispatch()

    const selectFile = (e) => {
        setSelectedImage(URL.createObjectURL(e.target.files[0]))        
        setFileInput(e.target.files[0])
    }

    const changeAvatar = () => {
        if (selectedImage.startsWith("dental_")) {
            const dispatcher = dispatch(updateUser({ id: user._id, userData: { defaultAvatar: selectedImage } }))
            dispatcher.then(res => {
                if(res.payload) closePopup()
            })
        } else {
            const dispatcher = dispatch(updateProfilePicture({ id: user._id, avatar: fileInput }))
            dispatcher.then(res => {
                if(res.payload) closePopup()
            })
        }
    }

    const closePopup = () => {
        setFileInput(null)
        setSelectedImage(null)
        setOpenAvatarPopup(false)
    }
    return (
        <div className='avatar w-fit flex items-center gap-3 max-md:flex-col'>
            <div className='cursor-pointer relative' onClick={() => setOpenAvatarPopup(true)}>
                <img src={user.avatar} className='rounded-full w-36 h-36 object-cover border transition-all ease-in-out hover:border-sky-400' alt={user.first_name} />
                <div className='text-sky-400 absolute bottom-2 right-1 bg-white rounded-full p-1'>
                    <Icon icon='material-symbols-light:edit-square-rounded' fontSize={22} />
                </div>
            </div>
            <div className='flex-1'>
                <h3 className='font-semibold'>Profile picture</h3>
                <span className='text-sm block mt-2 text-neutral-400'>* This avatar will be placed in your event ID.</span>
                <span className='text-sm block text-neutral-400'>* Make sure to insert a good photo of you, or choose among the defaults.</span>
            </div>
            <AnimatePresence>
                {
                    openAvatarPopup &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeOut", duration: 0.2 }}
                        className="overlay z-[999999] fixed top-0 left-0 w-full h-full grid place-items-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ ease: "easeOut", duration: 0.2 }}
                            ref={ref}
                            className='change-avatar p-4 rounded-lg shadow-md w-[500px] max-md:w-[calc(100%-15px)] bg-white border'
                        >
                            <span className='text-xl font-bold'>Avatar</span>
                            <label className='w-fit cursor-pointer block mx-auto'>
                                <input type="file" accept='image/*' onChange={selectFile} className='hidden' />
                                {
                                    selectedImage
                                        ?
                                        <img src={selectedImage.startsWith("dental_") ? `${process.env.NEXT_PUBLIC_BASE_URL}uploads/defaults/${selectedImage}` : selectedImage} className='rounded-full object-cover shadow-md mt-5 w-32 h-32' alt={selectedImage} />
                                        :
                                        <img src={tempUser.avatar} className='rounded-full shadow-md mt-5 w-32 h-32' alt={tempUser.first_name} />
                                }
                            </label>
                            <div className='mt-8'>
                                <span className='block mb-3 text-xs text-neutral-400'>You can choose among these default images as a profile picture</span>
                                <div className='grid grid-cols-3 gap-2 justify-items-center'>
                                    {
                                        defaultImages.map((img, index) => (
                                            <img key={index} onClick={() => setSelectedImage(img)} className={`rounded-lg border-2 transition-all ease-in hover:border-sky-400 cursor-pointer ${selectedImage?.includes(img) ? 'border-sky-400 opacity-50' : 'border-transparent'}`} src={`${process.env.NEXT_PUBLIC_BASE_URL}uploads/defaults/${img}`} alt={img} />
                                        ))
                                    }
                                </div>
                            </div>
                                <div className='mt-8 border-t flex items-center gap-2 justify-end pt-4 font-bold'>
                                <button className='main-btn disabled:opacity-25 disabled:hover:bg-sky-500' disabled={fileInput === null && selectedImage === null} onClick={changeAvatar}>Change</button>
                                <button className='alt-btn' onClick={closePopup}>Cancel</button>
                            </div>
                        </motion.div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default UserAvatar