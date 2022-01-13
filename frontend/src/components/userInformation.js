import React, { useState, createContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";



function UserInfo({userInfo}) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLogIn, setIsLogIn] = useState(localStorage.getItem("isLogIn"));

  const[user,setUser]=useState(userInfo)
  console.log(userInfo);
  console.log(userInfo);
 console.log(user);
  console.log(token, isLogIn);
  return (
    <div className="">
      <div style={{color:"white"}}>{user?`${user.firstName} ${user.lastName}`:""}</div>
    </div>
  );
}

export default UserInfo;
