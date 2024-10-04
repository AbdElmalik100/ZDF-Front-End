import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

export const me = createAsyncThunk('usersSlice/me', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('api/users/me')
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const googleAuth = createAsyncThunk('usersSlice/googleAuth', async ({ access_token, credentials, router }) => {
    try {
        const response = await axios.post('api/users/googleOAuth', { access_token, credentials })
        if (router) router.push("/")
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const updateProfilePicture = createAsyncThunk('userSlice/updateProfilePicture', async ({ id, avatar }) => {
    try {
        const formData = new FormData()
        formData.append("avatar", avatar)

        const response = await axios.patch(`api/users/${id}/avatar`, formData)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const updateUser = createAsyncThunk('userSlice/updateUser', async ({ id, userData }) => {
    try {
        const response = await axios.patch(`api/users/${id}`, userData)
        return response.data
    } catch (error) {
        console.log(error);
    }
})

const usersSlice = createSlice({
    name: "users",
    initialState: {
        isLoggedIn: false,
        user: null,
        users: [],
        loading: false,
        errors: {}
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("UTK")
            axios.defaults.headers.Authorization = ''
            document.cookie = "UTK=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            state.user = null
            state.isLoggedIn = false
        }
    },
    extraReducers: builder => {
        builder
            .addCase(me.pending, state => {
                state.loading = true
            })
            .addCase(me.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.isLoggedIn = true
            })
            .addCase(me.rejected, (state, action) => {
                localStorage.removeItem("UTK")
                axios.defaults.headers.Authorization = ''
                document.cookie = "UTK=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                state.user = null
                state.loading = false
                state.isLoggedIn = false
            })

        builder
            .addCase(googleAuth.pending, state => {
                state.errors = {}
            })
            .addCase(googleAuth.fulfilled, (state, action) => {
                state.user = action.payload.user
                localStorage.setItem("UTK", action.payload.token)
                axios.defaults.headers.Authorization = `Bearer ${action.payload.token}`
                document.cookie = `UTK=${action.payload.token}; path=/; max-age=${7 * 24 * 60 * 60}`; // Cookie expires in 7 days
                state.isLoggedIn = true
            })
            .addCase(googleAuth.rejected, (state, action) => {
                console.log(action.payload);
                toast.error("somethin went wrong")
            })

        builder
            .addCase(updateUser.pending, state => {
                state.errors = {}
                state.loading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = { ...state.user, ...action.payload }
                toast.success("Profile updated!")
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false
                console.log(action.payload);
                toast.error("somethin went wrong")
            })

        builder
            .addCase(updateProfilePicture.pending, state => {
                state.errors = {}
                state.loading = true
            })
            .addCase(updateProfilePicture.fulfilled, (state, action) => {
                state.loading = false
                state.user = { ...state.user, ...action.payload }
                toast.success("Profile updated!")
            })
            .addCase(updateProfilePicture.rejected, (state, action) => {
                state.loading = false
                console.log(action.payload);
                toast.error("somethin went wrong")
            })
    }
})

export const { logout } = usersSlice.actions

export default usersSlice.reducer