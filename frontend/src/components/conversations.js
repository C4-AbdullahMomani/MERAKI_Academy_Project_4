import axios from "axios";
import React, { useState, createContext, useEffect } from "react";
import "./css/conversations.css";
function Conversations({ conversation }) {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [user, setUser] = useState();
  useEffect(() => {
    const friendId = conversation.members.find(
      (member) => member !== userInfo._id
    );
    setUser(friendId);
    const getFriend = async () => {
      const res = await axios.get(
        `http://localhost:5000/users/search/${friendId}`
      );
      try {
        setUser(res.data.user);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getFriend();
  }, []);
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user?user.image:"https://wallsdesk.com/wp-content/uploads/2018/03/lynx-Images.jpg"}
      />
      <span className="conversationName">
        {user ? `${user.firstName} ${user.lastName}` : ""}
      </span>
    </div>
  );
}

export default Conversations;
