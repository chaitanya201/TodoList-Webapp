import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userLoginSlice'
import userObjSlice from './userObjSlice'
export  default configureStore( {

    reducer: {
        userLoginInfo: userSlice,
        userObj : userObjSlice,
    }
}
    
)