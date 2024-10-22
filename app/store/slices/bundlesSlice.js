import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getBundles = createAsyncThunk("bundlesSlice/getBundles", async (limit) => {
    try {
        const response = await axios.get(`api/bundles?limit=${limit}`)
        return response.data
    } catch (error) {
        return error.response.data
    }
})

export const getBundle = createAsyncThunk("bundlesSlice/getBundle", async (bundleId) => {
    try {
        const response = await axios.get(`api/bundles/${bundleId}`)
        return response.data
    } catch (error) {
        return error.response.data
    }
})

export const updateBundle = createAsyncThunk("workshopsSlice/updateBundle", async (bundleData) => {
    try {
        const response = await axios.patch(`api/bundles/${bundleData._id}`, bundleData)
        return response.data
    } catch (error) {
        return error.response.data
    }
})

const bundlesSlice = createSlice({
    name: "bundles",
    initialState: {
        bundles: [],
        bundle: null,
        loading: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getBundles.pending, state => {
                state.loading = true
            })
            .addCase(getBundles.fulfilled, (state, action) => {
                state.loading = false
                state.bundles = action.payload
            })
            .addCase(getBundles.rejected, (state, action) => {
                state.loading = false
            })
        
        builder
            .addCase(getBundle.pending, state => {
                state.loading = true
            })
            .addCase(getBundle.fulfilled, (state, action) => {
                state.loading = false
                state.bundle = action.payload
            })
            .addCase(getBundle.rejected, (state, action) => {
                state.loading = false
            })
        
        builder
            .addCase(updateBundle.pending, state => {
                state.loading = true
            })
            .addCase(updateBundle.fulfilled, (state, action) => {
                state.loading = false
                if (state.bundle && state.bundle._id === action.payload._id) state.bundle = action.payload
                state.bundles = state.bundles.map((bundle => bundle._id === action.payload._id ? action.payload : bundle)) 
            })
            .addCase(updateBundle.rejected, (state, action) => {
                state.loading = false
            })
    }
})


export default bundlesSlice.reducer