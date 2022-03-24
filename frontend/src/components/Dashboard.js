import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/userObjSlice";
import Todo from "./Todo";

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userObj.userObj);
  const [editCheck, setEditCheck] = useState(true);
  const [showEditWindow, setShowEditWindow] = useState(false);

  return (
    <div>
      {user.todoList.length > 0 ? (
        user.todoList.map((list) => {
          return (
            <div>
              <div>
                <big>{list}</big>
              </div>
              <div>
                {editCheck ? (
                  <div>
                    <button
                      onClick={() => {
                        setEditCheck(!editCheck);
                        setShowEditWindow(!showEditWindow);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div>
                {showEditWindow ? (
                  <Todo
                    showEditWindow={showEditWindow}
                    setShowEditWindow={setShowEditWindow}
                  />
                ) : (
                  <div></div>
                )}
              </div>
              <div>
                <button
                  onClick={async () => {
                    const res = await axios.post(
                      "http://localhost:5000/user/delete-task",
                      { task: list }
                    );
                    if (res.data.status === "success") {
                      dispatch(updateUser(res.data.user));
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div>No Tasks are created </div>
      )}
    </div>
  );
}
