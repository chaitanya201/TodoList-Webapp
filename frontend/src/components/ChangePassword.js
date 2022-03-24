import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/userObjSlice";
import Alert from "./Alert";
export default function ChangePassword() {
  const dispatch = useDispatch(); // creating object of dispatch using useDispatch()
  const user = useSelector((state) => state.userObj.userObj);
  const [password, setPassword] = useState("");
  const [originalPassword, setOriginalPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMsg, setAlertMsg] = useState(null);
  const formSubmit = async (e) => {
    e.preventDefault();
    if (password.trim().length > 7 && password === confirmPassword) {
      if (originalPassword === user.password) {
        const data = {
          password,
        };
        const response = await axios.post(
          "http://localhost:5000/user/change-password/",
          data
        );
        if (response.data.status === "success") {
          setAlertMsg("Password Changed Successfully");
          dispatch(updateUser(response.data.user))
        } else {
          setAlertMsg("failed to change the password");
        }
      } else {
        setAlertMsg("Entered password is wrong, it is invalid");
      }
    } else {
      setAlertMsg(
        "entered password and confirm password is not same or length of password is less than 7 "
      );
    }
  };

  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex m-auto content-center  ">
      {alertMsg ? <Alert msg={alertMsg} /> : <div></div>}

      <form onSubmit={formSubmit} method="post">
        <label htmlFor="password">Original Password</label>
        <input
          type="text"
          name="password"
          value={originalPassword}
          onChange={(e)=> {
              setOriginalPassword(e.target.value)
          }}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
        />{" "}
        <br />
        <label htmlFor="password">New Password</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e)=> {
              setPassword(e.target.value)
          }}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
        />{" "}
        <br />
        <label htmlFor="password">Confirm Password</label>
        <input
          type="text"
          name="password"
          value={confirmPassword}
          onChange={(e)=> {
              setConfirmPassword(e.target.value)
          }}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
        />{" "}
        <br />
        <input
          type="submit"
          value="Save Changes"
          className="w-full px-6 py-2 mt-4 text-white bg-pink-600 rounded-lg "
        />
      </form>
    </div>
  );
}
