import {createSlice} from '@reduxjs/toolkit';
export const userSlice = createSlice({
    name : "loginStatus",
    initialState: {
        isLoggedIn : false
    },
    reducers : {
        changeLoginState : (state,action) => {
            state.isLoggedIn = action.payload
        }
    }
})

export const {changeLoginState} = userSlice.actions
export default userSlice.reducer