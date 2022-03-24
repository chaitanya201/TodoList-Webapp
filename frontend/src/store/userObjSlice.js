import {createSlice} from '@reduxjs/toolkit';

export const userObjSlice = createSlice({
    name: "userObject",
    initialState: {
        userObj : {}
    },
    reducers: {
        updateUser: (state, action) => {
            state.userObj = action.payload
            console.log("action payload is ", action.payload);
        }
    }
})

export const {updateUser} = userObjSlice.actions
export default userObjSlice.reducer