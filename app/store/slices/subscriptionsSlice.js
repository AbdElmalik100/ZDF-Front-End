import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getSubscriptions = createAsyncThunk("subscriptionsSlice/getSubscriptions", async (userId = "") => {
    try {
        const response = await axios.get(`api/subscriptions?user=${userId}`)
        return response.data
    } catch (error) {
        return error.response.data
    }
})

const subscriptionsSlice = createSlice({
    name: "subscriptions",
    initialState: {
        subscriptions: [],
        loading: false
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getSubscriptions.pending, state => {
                state.loading = true
            })
            .addCase(getSubscriptions.fulfilled, (state, action) => {
                state.loading = false
                state.subscriptions = action.payload
            })
            .addCase(getSubscriptions.rejected, (state, action) => {
                state.loading = false
            })
    }
})


export default subscriptionsSlice.reducer