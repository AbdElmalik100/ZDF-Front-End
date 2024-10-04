import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getLatestEvent = createAsyncThunk("eventsSlice/getLatestEvent", async () => {
    try {
        const response = await axios.get("api/events")        
        return response.data
    } catch (error) {
        return error
    }
})


const eventsSlice = createSlice({
    name: "events",
    initialState: {
        event: null,
        loading: false
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getLatestEvent.pending, state => {
                state.loading = true
            })
            .addCase(getLatestEvent.fulfilled, (state, action) => {                
                state.loading = false
                state.event = action.payload[0]
            })
            .addCase(getLatestEvent.rejected, (state, action) => {
                state.loading = false
            })
    }
})

export default eventsSlice.reducer