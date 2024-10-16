import { configureStore } from '@reduxjs/toolkit'
import usersSlice from './slices/usersSlice'
import eventsSlice from './slices/eventsSlice'
import bundlesSlice from './slices/bundlesSlice'
import workshopsSlice from './slices/workshopsSlice'
import subscriptionsSlice from './slices/subscriptionsSlice'


export const store = configureStore({
    reducer: {
        users: usersSlice,
        events: eventsSlice,
        bundles: bundlesSlice,
        workshops: workshopsSlice,
        subscriptions: subscriptionsSlice,
    },
})