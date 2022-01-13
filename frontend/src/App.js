import React, { useState, createContext, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import "./App.css";
import Welcome from "./components/welcoming";
import LogIn from "./components/login";
import Register from "./components/register";
import Home from "./components/home";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLogIn, setIsLogIn] = useState(localStorage.getItem("isLogIn"));
  const [user,setUser]=useState()
  const[userInfo,setUserInfo]=useState(JSON.parse(localStorage.getItem('userInfo')))
  console.log(userInfo);
  console.log(user);
  console.log(token, isLogIn);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home user={user} userInfo={userInfo}/>} />
        
        <Route
          path="/login"
          element={<LogIn  setUser={setUser} />}
        />
        <Route path="/users" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
