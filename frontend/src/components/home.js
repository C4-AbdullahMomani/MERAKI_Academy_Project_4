import React, { useState, createContext, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import LogIn from "./login";
import "./css/Home.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      {/* <h1 style={{color:"white"}}>hello to our page</h1> */}
      <div className="information">
        {" "}
        <div className="top">
          <img src="https://i.etsystatic.com/22479060/r/il/b8c9e7/2750779710/il_570xN.2750779710_t69p.jpg" />
          <h3 style={{ textAlign: "center", color: "white", height: "5px" }}>
            abdallah almomani
          </h3>
        </div>
        <div>
          <Navigate />
        </div>
      </div>
      <div className="posts"> </div>
      <div className="users">
        <button
          onClick={() => {
            window.localStorage.clear();
            navigate("/login")
          }}
        >
          Logout
        </button>{" "}
      </div>
    </div>
  );
}
function Navigate() {
  return (
    <>
      <div className="informationNavigate">
        {" "}
        <div className="link">
          {" "}
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "20px",
              width: "100%",
            }}
          >
            Home
          </Link>
        </div>
        <div className="link">
          <Link
            to="/users"
            style={{ textDecoration: "none", color: "white", fontSize: "20px" }}
          >
            Profile
          </Link>
        </div>
        <div className="link">
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "20px",
              width: "100%",
            }}
          >
            Messages
          </Link>
        </div>
        <div className="link">
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "20px",
              width: "100%",
            }}
          >
            Top News
          </Link>
        </div>
      </div>
    </>
  );
}
export default Home;
