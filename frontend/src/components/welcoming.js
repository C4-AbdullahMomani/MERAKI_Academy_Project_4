import React, { useState, createContext, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import LogIn from "./login";
import "./css/welcome.css";

function Welcome() {
  return (
    <div className="welcome">
      <Navigate />
      <div> </div>
    </div>
  );
}
function Navigate() {
  return (
    <>
      <div className="welcomeNavigate">
        {" "}
        <Link
          to="/login"
          style={{ textDecoration: "none", color: "white", fontSize: "20px" }}
        >
          Login
        </Link>
        <Link
          to="/users"
          style={{ textDecoration: "none", color: "white", fontSize: "20px" }}
        >
          Register
        </Link>
      </div>
    </>
  );
}
export default Welcome;
