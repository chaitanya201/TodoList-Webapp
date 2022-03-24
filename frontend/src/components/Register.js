import React, {useState} from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {changeLoginState} from '../store/userLoginSlice'
import {updateUser} from '../store/userObjSlice'
import Alert from './Alert'

// Register component
export default function Register() {

    const navigate = useNavigate() // creating navigate object

    // creating dispatch object
    const dispatch = useDispatch()

    // declaring variables to store user info
    const [name, setName] = useState("");
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");

    // collecting user info
    const changeName = (event) => {
        setName(event.target.value)
    }
    const changeusername = (event) => {
        setusername(event.target.value)
    }
    
    const changePassword = (event) => {
        setPassword(event.target.value)
    }

    // alert part
    const [alertMsg, setAlertMsg] = useState(null);
    const alterMsgColor= "red"
    // defining what would happen after form submission
    const onFormSubmit = async (event) => {
        event.preventDefault()
        if(!name.trim()) {
            setAlertMsg("Provide Valid name")
            return
        }
        if(password.length < 8) {
            setAlertMsg("Password length is less than 8")
            return
        }
        const user = {
            name: name.trim(),
            username: username.trim(),
            password: password.trim()
           
        }
        const response = await axios.post("http://localhost:5000/user/registration", user);
        console.log("after registrations in form function");
        if (response.data.status === "success") {
            console.log("registration is successful in same function");
            
            dispatch(changeLoginState(true));
            dispatch(updateUser(response.data.user));
            console.log("this is the user after login ", );
            navigate("/login")
        } else {
            console.log("registration failed", response.data.msg);
            const msg = response.data.msg
            setAlertMsg(msg)
            console.log("alert msg is ", alertMsg);
        }
        
    }
    
    return (
        <div>
        { alertMsg ? <Alert msg={alertMsg} alertColor={alterMsgColor} /> : <div> </div>}
        <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>Register</h1>
                <form method="post" onSubmit={onFormSubmit}>
                    <input type="text" name='name' required placeholder='Name' onChange={changeName} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                    <input type="text" name='username' required placeholder='username' onChange={changeusername} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                    <input type="password" name='password' placeholder='Password' required onChange={changePassword} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                    <input type="submit" value="Register" className="w-full px-6 py-2 mt-4 text-white bg-emerald-600 rounded-lg hover:bg-blue-900" />
                </form>
            </div>
        </div>
    )
}
