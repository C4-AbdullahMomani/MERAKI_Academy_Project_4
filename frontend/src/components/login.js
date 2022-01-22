import React, { useState, createContext, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Navigate from "../components/welcoming";
import axios from "axios";
import "./css/login.css";

import Texting from './css/Texting.gif'
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
    <><div class="forms-container"><img className="image" src={Texting}/>
    <div class="signin-signup">
     
        <h2 class="title">Sign in</h2>
        <div class="input-field">
          <i class="fas fa-user"></i>
          <input type="text" placeholder="Email" onChange={(e) => {
              setEmail(e.target.value);
            }}/>
        </div>
        <div class="input-field">
          <i class="fas fa-lock"></i>
          <input type="password" placeholder="Password" onChange={(e) => {
              setPassWord(e.target.value);
            }} />
        </div>
        <button class="btn solid"  onClick={(e) => {
          axios
            .post("http://localhost:5000/login", {
              email: email,
              passWord: passWord,
            })
            .then(async(response) => {
              
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
        }}>Login</button>
        {/* <p class="social-text">Or Sign in with social platforms</p>
        <div class="social-media">
          <a href="#" class="social-icon">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" class="social-icon">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" class="social-icon">
            <i class="fab fa-google"></i>
          </a>
          <a href="#" class="social-icon">
            <i class="fab fa-linkedin-in"></i>
          </a>
        </div> */}
      
      
    </div>
  </div>


    
      {/* <div className="login" style={{backgroundImage:{Texting}}}>
      
       
        <div style={{ height: "175px" ,backgroundImage:"https://upf-web.com/wp-content/uploads/2019/07/Social-Networking.png"}}></div>
        <div><img src={Texting}/>
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
      </div> */}
      <p style={{color:"white"}}>{success ? message : ""}</p>
    </>
  );
}
// function Navigate(){

// }
export default LogIn;
