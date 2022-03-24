import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/userObjSlice";
import Alert from "./Alert";

export default function UserProfile() {
  const dispatch = useDispatch(); // creating object of dispatch using useDispatch()
  const user = useSelector((state) => state.userObj.userObj);

  // creating variables to store the personal info of users
  let [username, setusername] = useState(user.username);

  console.log("*****************************");
  console.log("-----------------------------+++++++");

  const [alertMsg, setAlertMsg] = useState(null);
  const [alterMsgColor, setAlterMsgColor] = useState("emerald");
  // creating useState hook for file upload

  const onusernameChange = (event) => {
    setusername(event.target.value);
  };

  // printing image
  // function for form submit
  const formSubmit = async (event) => {
    event.preventDefault();

    if (username.trim().length > 4) {
      username = username.trim();
      let data = new FormData();

      data.append("username", username);
      data.append("originalUsername", user.username);
      const response = await axios.post(
        "http://localhost:5000/user/edit-profile/",
        data
      );
      if (response.data) {
        dispatch(updateUser(response.data.user));
        setAlertMsg("Profile Updated");
        console.log("msg is ", alertMsg);
        console.log("user after updating is ", response.data.user);
      } else {
        setAlertMsg("Failed to update profile");
        setAlterMsgColor("red");
      }
    } else {
      setAlertMsg("all the fields are required");
    }
  };

  return (
    <div className="grid justify-items-center">
      <div>
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Edit section
        </h1>
        {alertMsg ? (
          <Alert msg={alertMsg} alertColor={alterMsgColor} />
        ) : (
          <div> </div>
        )}
        <div className="max-w-sm w-full lg:max-w-full lg:flex m-auto  ">
          <br />

          <form onSubmit={formSubmit} method="post">
            <input
              type="text"
              name="username"
              value={username}
              onChange={onusernameChange}
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
      </div>
    </div>
  );
}
