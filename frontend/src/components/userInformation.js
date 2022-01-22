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
    <div style={{display:"flex",marginRight:"100px",marginTop:"25px",marginLeft:"10px"}}>
      <div style={{paddingBottom:"20px"}}><img style={{width: "40px", height: "40px" ,borderRadius:"50%",objectFit: "cover"}} src={userInfo.image} /></div>
      <span style={{color:"white" ,height:"100%",marginLeft:"10px",marginTop:"7px"}}>{user?`${user.firstName} ${user.lastName}`:undefined}</span>
      </div>
    </>
  );
}

export default UserInfo;
