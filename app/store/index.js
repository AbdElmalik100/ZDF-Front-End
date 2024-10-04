import { configureStore } from '@reduxjs/toolkit'
import usersSlice from './slices/usersSlice'
import eventsSlice from './slices/eventsSlice'
import subscriptionsSlice from './slices/subscriptionsSlice'


export const store = configureStore({
    reducer: {
        users: usersSlice,
        events: eventsSlice,
        subscriptions: subscriptionsSlice,
    },
})