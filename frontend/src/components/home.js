import React, { useState, createContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomePost from "./homePost";
import "./css/Home.css";
import axios from "axios";
import UserInfo from "./userInformation";
import { Search, Chat } from "@material-ui/icons";
function Home({ user, userInfo }) {
  const navigate = useNavigate();
  const [userImg, setUserImg] = useState(user);

  console.log(user);
  return (
    <>
      <div className="searchBar">
        <div style={{ textAlign: "left", marginLeft: "2%", marginTop: "1%" }}>
          Social
        </div>
        <div style={{ marginLeft: "2%", marginTop: "1%", cursor: "pointer" }}>
          <Chat
            onClick={() => {
              navigate("/messenger");
            }}
          />
        </div>
        <div className="search">
          <input placeholder="Search" />
          <Search />
        </div>
        <div className="users">
          <button
            onClick={() => {
              window.localStorage.clear();
              navigate("/");
            }}
          >
            Logout
          </button>{" "}
        </div>
      </div>
      <div className="home">
        {/* <h1 style={{color:"white"}}>hello to our page</h1> */}
        <div className="information">
          {" "}
          <div className="top">
            <img src="https://i.etsystatic.com/22479060/r/il/b8c9e7/2750779710/il_570xN.2750779710_t69p.jpg" />
            :<img />
            <UserInfo userInfo={userInfo} />
          </div>
          <div>
            <Navigate />
          </div>
        </div>
        <div className="posts">
          {" "}
          <HomePost />
        </div>
        <div className="follower"></div>
      </div>
    </>
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
            to="/messenger"
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
