import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getWorkshops = createAsyncThunk("workshopsSlice/getWorkshops", async () => {
    try {
        const response = await axios.get("api/workshops")
        return response.data
    } catch (error) {
        return error.response.data
    }
})

export const getWorkshop = createAsyncThunk("workshopsSlice/getWorkshop", async (workshopId) => {
    try {
        const response = await axios.get(`api/workshops/${workshopId}`)
        return response.data
    } catch (error) {
        return error.response.data
    }
})

export const updateWorkshop = createAsyncThunk("workshopsSlice/updateWorkshop", async (workshopData) => {
    try {
        const response = await axios.patch(`api/workshops/${workshopData._id}`, workshopData)
        return response.data
    } catch (error) {
        return error.response.data
    }
})


const workshopsSlice = createSlice({
    name: "workshop",
    initialState: {
        workshops: [],
        workshop: null,
        loading: false
    }, 
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getWorkshops.pending, state => {
                state.loading = true
            })
            .addCase(getWorkshops.fulfilled, (state, action) => {
                state.loading = false
                state.workshops = action.payload
            })
            .addCase(getWorkshops.rejected, (state, action) => {
                state.loading = false
            })
        
        builder
            .addCase(getWorkshop.pending, state => {
                state.loading = true
            })
            .addCase(getWorkshop.fulfilled, (state, action) => {
                state.loading = false
                state.workshop = action.payload
            })
            .addCase(getWorkshop.rejected, (state, action) => {
                state.loading = false
            })
        
        builder
            .addCase(updateWorkshop.pending, state => {
                state.loading = true
            })
            .addCase(updateWorkshop.fulfilled, (state, action) => {
                state.loading = false
                if (state.workshop && state.workshop._id === action.payload._id) state.workshop = action.payload
                state.workshops = state.workshops.map((workshop => workshop._id === action.payload._id ? action.payload : workshop)) 
            })
            .addCase(updateWorkshop.rejected, (state, action) => {
                state.loading = false
            })
    }
})

export default workshopsSlice.reducer