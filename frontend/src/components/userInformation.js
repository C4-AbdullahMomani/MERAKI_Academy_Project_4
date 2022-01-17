import React, { useState, createContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


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
      <img style={{width: "100%", height: "50vh" }} src={userInfo.image} />
      <div style={{color:"white",marginTop:"15px",marginBottom:"15px" ,textAlign:"center"}}>{user?`${user.firstName} ${user.lastName}`:undefined}</div>
    </div>
  );
}

export default UserInfo;
