import React, { useState, createContext, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Navigate from "../components/welcoming";
import axios from "axios";
import "./css/login.css";

function LogIn({setUser}) {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState();
  const [token, setToken] = useState("");
  const [isLogIn, setIsLogIn] = useState(false);
  const[userInfo,setUserInfo]=useState()
  console.log(userInfo);
  const navigate=useNavigate()
  return (
    <>
      <div className="login">
        {/* <Navigate/> */}
        <div style={{ height: "175px" }}></div>
        <div>
          <h2 style={{ color: "white", textDecoration: "underLine" }}>Login</h2>
          <input type={"email"}
            placeholder="EMAIL"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <br />
          <input type={"password"}
            placeholder="Password"
            onChange={(e) => {
              setPassWord(e.target.value);
            }}
          />
          <br />
          <br />
          <br />
          <button onClick={(e) => {
          axios
            .post("http://localhost:5000/login", {
              email: email,
              passWord: passWord,
            })
            .then((response) => {
              setSuccess(true);
              localStorage.setItem('isLogIn',true)
              setIsLogIn(localStorage.getItem('isLogIn'));
              localStorage.setItem('token',response.data.token)
              setToken(localStorage.getItem('token'));
              setUser(response.data.userInformation.image)
              localStorage.setItem('userInfo',JSON.stringify(response.data.userInformation))
              setUserInfo(JSON.parse(localStorage.getItem('userInfo')))
              navigate("/home")
              
            })
            .catch((err) => {
              setSuccess(true);
              
              setMessage(err.response.data.message);
            });
        }}>Login</button>{" "}
         <p style={{color:"white"}}>{success ? message : ""}</p>
        </div>
      </div>
    </>
  );
}
// function Navigate(){

// }
export default LogIn;
