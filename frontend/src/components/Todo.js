import axios from "axios";
import React, { useState } from "react";
import Alert from "./Alert";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/userObjSlice";

export default function Todo({  setShowEditWindow, showEditWindow }) {
    const user = useSelector((state) => state.userObj.userObj)
  const disptach = useDispatch();
  const [handleTask, setHandleTask] = useState("");
  const [alertMsg, setAlertMsg] = useState(null);
  const [cancelEdit, setCancelEdit] = useState(false);
  if (cancelEdit) {
    setShowEditWindow(!showEditWindow);
    return;
  }
  const formSubmit = async (e) => {
    e.preventDefault();
    setShowEditWindow(!showEditWindow);
    if (handleTask.trim().length > 1) {
        const data = {
            task : handleTask
        }
      const response = await axios.post("http://localhost:5000/user/add-task", data, {
          headers: `Bearer ${user.token}`
      });
      if (response.data.status !== "success") {
        setAlertMsg(response.data.msg);
      } else {
        disptach(updateUser(response.data.user));
      }
    }
  };
  return (
    <div>
      <div>
        <div>{alertMsg ? <Alert msg={alertMsg} /> : <div></div>}</div>
        <form method="post" onSubmit={formSubmit}>
          <div>
            <input
              type="text"
              value={handleTask}
              onChange={(e) => {
                setHandleTask(e.target.value);
              }}
            />
          </div>
          <button
            onClick={() => {
              setCancelEdit(true);
            }}
          >
            Cancel
          </button>
          <br />
          <input type="submit" value={"Edit Task"} />
          <br />
        </form>
      </div>
    </div>
  );
}
