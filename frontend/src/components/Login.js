
import React, {useState} from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import {changeLoginState} from '../store/userLoginSlice'
import {updateUser} from '../store/userObjSlice'
import { Navigate, useNavigate } from 'react-router-dom';
import Alert from './Alert'
export default function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const [alertMsg, setAlertMsg] = useState(null);
    const alterMsgColor= "red"
    const onusernameChange = (event) => {
        setusername(event.target.value)
    }
    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const onFormSubmit = async (event) => {
        event.preventDefault();
        const user = {
            username:username,
            password: password
        }
        const response = await axios.post("http://localhost:5000/user/login", user);
        
        if(response.data.status === "success"){
            console.log("data after login is ", response.data.user);
            dispatch(changeLoginState(true));
            dispatch(updateUser(response.data.user))
            navigate("/user-dashboard")
        } else {
            console.log("failed to login");
            setAlertMsg("username or Password is incorrect")
        }
    }
    
    return (
    <div>
    { alertMsg ? <Alert msg={alertMsg} alertColor={alterMsgColor} /> : <div> </div>}
        <div className='h-screen flex bg-gray-100'>
        
        <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
            <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>Login 🔐</h1>
            <form method='post' onSubmit={onFormSubmit} >
                <input type="text" name='username' placeholder='username' onChange={onusernameChange} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                <br />
                <input type="password" name='password' placeholder='Password' onChange={onPasswordChange} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                <div className='flex justify-center items-center mt-6'>
                    <input type="submit" value='Login' className="w-full px-6 py-2 mt-4 text-white bg-emerald-600 rounded-lg hover:bg-blue-900" /> 

                </div>
            </form> 
        </div>
    </div>
    </div>
    )
}
