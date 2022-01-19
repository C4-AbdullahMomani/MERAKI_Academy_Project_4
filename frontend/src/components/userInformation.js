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
  return (<>
    
      <div><img style={{width: "100%", height: "150" ,objectFit: "cover",margin:"0px"}} src={userInfo.image} /></div>
      <h1 style={{color:"white",marginTop:"20px",marginBottom:"20px" ,textAlign:"center"}}>{user?`${user.firstName} ${user.lastName}`:undefined}</h1>
    </>
  );
}

export default UserInfo;
