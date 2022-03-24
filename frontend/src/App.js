import { useSelector } from "react-redux";
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import ChangePassword from "./components/ChangePassword";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import UserProfile from "./components/Profile";
import Register from "./components/Register";

function App() {
  const loginStatus = useSelector((state) => state.userLoginInfo.isLoggedIn)

  return (
    <BrowserRouter>
    {
        loginStatus ? <Navbar /> : <div></div>
      }
      <Routes>
        
        <Route path="/register" element={<Register />} > </Route>
        <Route path="login" element={<Login />} ></Route>
        { loginStatus ?
          <Route path="/user-profile" element={<UserProfile />} ></Route> :
          <Route path="/login" element={<Login />} ></Route>
        }
        { loginStatus ?
          <Route path="/user-dashboard" element={<Dashboard />} ></Route> :
          <Route path="/login" element={<Login />} ></Route>
        }
        { loginStatus ?
          <Route path="/change-password" element={<ChangePassword />} ></Route> :
          <Route path="/login" element={<Login />} ></Route>
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
