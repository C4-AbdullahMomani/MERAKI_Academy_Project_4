import React, { useState, createContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Markunread } from "@material-ui/icons";
function Users() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLogIn, setIsLogIn] = useState(localStorage.getItem("isLogIn"));
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("http://localhost:5000/users");
      try {
        console.log(res);
        setFriends(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, []);

  const checkConversation = async (userInfo, friend) => {
    const res = axios.get(
      `http://localhost:5000/conversation/search/${userInfo._id}/${friend._id}`
    );
    try {
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      {friends &&
        friends.map((friend) => {
          return (
            <div className="chatFriend">
              <div className="imgContainer">
                <img
                  className="img"
                  src="https://thumbs.dreamstime.com/b/bobcat-kitten-15843174.jpg"
                />
              </div>
              <div className="chatOnlineBadge">
                <Markunread
                  onClick={async () => {
                    const res = await axios.post(
                      "http://localhost:5000/conversation",
                      { senderId: userInfo._id, recieverId: friend._id }
                    );
                    try {
                      console.log(res);
                      navigate("/messenger");
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                />
              </div>
              <span className="chatOnlineName">
                {friend ? `${friend.firstName} ${friend.lastName}` : ""}
              </span>
            </div>
          );
        })}
    </div>
  );
}

export default Users;
