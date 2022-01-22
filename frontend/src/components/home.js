import React, { useState, createContext, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomePost from "./homePost";
import "./css/Home.css";
import axios from "axios";
import UserInfo from "./userInformation";
import { Search, Chat, Logout } from "@material-ui/icons";
import SearchFriend from "./search";
import Users from "./users";
import { storage } from "./fireBase";
import {FaSignOutAlt,FaLongArrowAltLeft } from "react-icons/fa";
import Postbro from "./css/Postbro.png"
import logo from "./css/logo.png"
function Home({ user, userInfo, setProfileId }) {
  const navigate = useNavigate();
  const [userImg, setUserImg] = useState(user);
  const [search, setSearch] = useState(null);
  const [searchStatus, setSearchStatus] = useState("");

  const allInputs = {
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/social-51311.appspot.com/o/images%2FIMG_20211120_233658.jpg?alt=media&token=ed95d451-5e0e-4579-95e9-905f8058e09a",
  };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  console.log(imageAsFile);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const handleFireBaseUpload = (e) => {
    e.preventDefault();
    console.log("start of upload");
    // async magic goes here...
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    const uploadTask = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("images")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl((prevObject) => ({
              ...prevObject,
              imgUrl: fireBaseUrl,
            }));
            console.log(imageAsUrl);
          });
      }
    );
  };

  return (
    <>
      <div className="searchBar">
        <h1
          style={{
            textAlign: "left",
            marginLeft: "2%",
            marginTop: "1%",
            color: "white",
          }}
        >
          Sociality
        </h1>
        <div style={{ marginLeft: "2%", marginTop: "1.5%", cursor: "pointer" }}>
          <Chat
            style={{ color: "white" }}
            onClick={() => {
              navigate("/messenger");
            }}
          />
        </div>
        <div>
          <div className="search">
            <input
              placeholder="Search for friends..."
              onChange={(e) => {
                setSearchStatus(e.target.value);
                axios
                  .get(`http://localhost:5000/users/${e.target.value}`)
                  .then((res) => {
                    console.log(res.data.user);
                    setSearch(res.data.user);
                  })
                  .catch((err) => console.log(err));
              }}
            />
            <Search />
          </div>
        </div>
        <div className="users">
          {" "}<div style={{cursor:"pointer"}} onClick={() => {
            setProfileId(userInfo);
            navigate("/profile");
          }}>
           <UserInfo userInfo={userInfo}  /></div><FaSignOutAlt style={{cursor:"pointer"}} onClick={() => {
              window.localStorage.clear();
              navigate("/");
            }}/>
        </div>
      </div>
      <div className="home">
        {/* <h1 style={{color:"white"}}>hello to our page</h1> */}
        <div id="information">
         
          {/* <div className="top">
            <UserInfo userInfo={userInfo} />
            <form onSubmit={handleFireBaseUpload}>
              <input type="file" onChange={handleImageAsFile} />
              <button>upload</button>
            </form>
          </div>
          <div>
            <Navigate setProfileId={setProfileId} />
          </div> */}
        </div>
        <div className="posts">
          {searchStatus ? (
            <div style={{ width: "50%", backgroundColor: "rgb(245,243,243)" }}>
              {search &&
                search.map((user) => (
                  <SearchFriend user={user} setProfileId={setProfileId} />
                ))}
            </div>
          ) : (
            ""
          )}

          <HomePost />
        </div>
        <div className="follower"> <div
            style={{
              marginTop: "20px",
              textAlign: "center",
              borderBottom: "1px solid rgb(245,243,243)",
            }}
          > 
            <h2>Friends</h2>
          </div>{" "}
          <Users /></div>
      </div>
    </>
  );
}
function Navigate({ setProfileId }) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  return (
    <>
      <div className="informationNavigate">
        {" "}
        <div className="link">
          {" "}
          <Link
            to="/home"
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
        <div
          className="link"
          onClick={() => {
            setProfileId(userInfo);
            navigate("/profile");
          }}
        >
          <Link
            to=""
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
