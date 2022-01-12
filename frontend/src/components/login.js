import React, { useState, createContext, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./css/login.css"


function LogIn() {
  return (<>
    <div className="login">
     <div>
      <input placeholder="EMAIL"/><br/>
      <br/>
      <input placeholder="Password"/><br/>
    <button>Login</button> </div></div>
     </>
  );
}
// function Navigate(){

// }
export default LogIn;
