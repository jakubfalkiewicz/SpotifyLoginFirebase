import { createSlice } from "@reduxjs/toolkit";
import userInterface from "@/modules/HomeModule/interfaces/userInterface";

const initialState: userInterface = {
    email: "",
    confirmEmail: "",
    password: "",
    username: "",
    month: "",
    day: "",
    year: "",
    gender: "",
    share: false,
    loggedIn: false,
}

export const userSlice = createSlice({
    name: 'userHandler',
    initialState: {user: initialState},
    reducers: {
        setUser: (state,action) => {
            sessionStorage.setItem("user", JSON.stringify({...action.payload}))
            state.user = {...action.payload}
        },
        logoutUser: (state) => {
            sessionStorage.removeItem("user")
            state.user.loggedIn = false
        }
    }
})

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;