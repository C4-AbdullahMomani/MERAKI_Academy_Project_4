import React, { useState, createContext, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomePost from "./homePost";
import "./css/Home.css";
import axios from "axios";
import UserInfo from "./userInformation";
import { Search, Chat } from "@material-ui/icons";

import Users from "./users";
import { storage } from "./fireBase";
function Home({ user, userInfo }) {
  const navigate = useNavigate();
  const [userImg, setUserImg] = useState(user);
  const allInputs = { imgUrl: "https://firebasestorage.googleapis.com/v0/b/social-51311.appspot.com/o/images%2FIMG_20211120_233658.jpg?alt=media&token=ed95d451-5e0e-4579-95e9-905f8058e09a" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  console.log(imageAsFile);
  
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };
  
  const handleFireBaseUpload = e => {
    e.preventDefault()
  console.log('start of upload')
  // async magic goes here...
  if(imageAsFile === '') {
    console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
  }
  const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
  //initiates the firebase side uploading 
  uploadTask.on('state_changed', 
  (snapShot) => {
    //takes a snap shot of the process as it is happening
    console.log(snapShot)
  }, (err) => {
    //catches the errors
    console.log(err)
  }, () => {
    // gets the functions from storage refences the image storage in firebase by the children
    // gets the download url then sets the image from firebase as the value for the imgUrl key:
    storage.ref('images').child(imageAsFile.name).getDownloadURL()
     .then(fireBaseUrl => {
       setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
       console.log(imageAsUrl);
     })
  })
  }

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
           
            <UserInfo userInfo={userInfo} />
            <form onSubmit={handleFireBaseUpload}>
              <input type="file" onChange={handleImageAsFile} />
              <button>upload</button>
            </form>
            
          </div>
          <div>
            <Navigate />
          </div>
        </div>
        <div className="posts">
          {" "}
          <HomePost />
        </div>
        <div className="follower">
          {" "}
          <Users />
        </div>
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
