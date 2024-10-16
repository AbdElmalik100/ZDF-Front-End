'use client'
import { useGoogleOneTapLogin } from '@react-oauth/google'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { googleAuth, me } from './store/slices/usersSlice';
import { getLatestEvent } from './store/slices/eventsSlice';
import { getWorkshops } from './store/slices/workshopsSlice';
import { getSubscriptions } from './store/slices/subscriptionsSlice';
import { getBundles } from './store/slices/bundlesSlice';

function Main({ children }) {
    const dispatch = useDispatch()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { user } = useSelector(state => state.users)

    useGoogleOneTapLogin({
        onSuccess: credentialResponse => {
            dispatch(googleAuth({ access_token: "", credentials: credentialResponse.credential }))
        },
        onError: error => {
            console.log(error);
        },
        use_fedcm_for_prompt: true,
        cancel_on_tap_outside: false,
        disabled: isLoggedIn
    });

    useEffect(() => {
        if(user) dispatch(getSubscriptions(user._id))
    }, [dispatch, user])

    useEffect(() => {
        if (localStorage.getItem("UTK")) axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem("UTK")}`
        localStorage.getItem("UTK") ? setIsLoggedIn(true) : setIsLoggedIn(false)
        dispatch(me())
        dispatch(getLatestEvent())
        dispatch(getBundles(3))
        dispatch(getWorkshops())
    }, [])


    return children
}

export default Main