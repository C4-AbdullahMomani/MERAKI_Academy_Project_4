import React, { useState, createContext, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import  Navigate from "../components/welcoming" 
import "./css/login.css"


function LogIn() {
  return (<>
    <div className="login">
      {/* <Navigate/> */}
      <div style={{height:"175px"}}></div>
     <div>
     <h2 style={{color:"white",textDecoration:"underLine"}}>Login</h2>
      <input placeholder="EMAIL"/><br/>
      <br/>
      <input placeholder="Password"/><br/><br/><br/>
    <button>Login</button> </div></div>
     </>
  );
}
// function Navigate(){

// }
export default LogIn;
