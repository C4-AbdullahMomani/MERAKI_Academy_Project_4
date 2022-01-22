import axios from "axios";
import React, { useState, useEffect ,createContext} from "react";
import "./css/friend.css";




export default function Friend({ onLineUsers, setCurrentChat }) {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [friends, setFriends] = useState([]);
  const [onLineFriends, setOnLineFriends] = useState([]);
console.log(friends);
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

  useEffect(() => {
    setOnLineFriends(friends.filter((f) => onLineUsers.includes(f._id)));
  }, [friends, onLineUsers]);

  return (
    
    <div className="chatOnLine">
      {onLineFriends.map((o) => (
        <div className="chatFriend">
          <div className="imgContainer">
            <img
              className="img"
              src={o?o.image:""}
            />
          </div>
          <div className="chatOnlineBadge"></div>
          <span className="chatOnlineName">{`${o?.firstName} ${o?.lastName}`}</span>
        </div>
      ))}
    </div>
  );
}
