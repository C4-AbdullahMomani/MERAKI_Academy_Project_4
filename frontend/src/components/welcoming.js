import React, { useState, createContext, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import LogIn from "./login";
import "./css/welcome.css";
import Texting from './css/Texting.gif'
function Welcome() {
  return (
    <div className="welcome">
      <div className="lefContainer"><div className="up"> <div style={{marginLeft:"125px",width:"121%",marginBottom:"20px"}}><h1 >Welcome To Sociality</h1></div></div><Navigate /></div>
     
      <img className="image" src={Texting}/>
      <div> </div>
    </div>
  );
}
function Navigate() {
  return (
    <>
      <div className="welcomeNavigate">
        {" "}
        <div><Link
          to="/login"
          style={{  color: "white", fontSize: "30px" }}
        >
         SignIn
        </Link></div>
        <div>  <Link
          to="/users"
          style={{   fontSize: "30px" , color: "black"}}
        >
          SignUp
        </Link></div>
      </div>
    </>
  );
}
export default Welcome;
