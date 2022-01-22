import React, { useState, createContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Markunread } from "@material-ui/icons";
import "../components/css/search.css"
function SearchFriend({user,setProfileId}) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLogIn, setIsLogIn] = useState(localStorage.getItem("isLogIn"));
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const [friends, setFriends] = useState([]);
 

  

  return (
    <div className="container">
      
            <div className="chatFriend" onClick={()=>{
              
              setProfileId(user)
              navigate("/profile")}}>
              <div className="imgContainer">
              {user.image? (<img
                  className="img"
                  src={user.image}
                />):""}
              </div>
              
              <span className="chatOnlineName">
                {user ? `${user.firstName} ${user.lastName}` : ""}
              </span>
            </div>

        
    </div>
  );
}

export default SearchFriend;
