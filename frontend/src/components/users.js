import React, { useState, createContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Markunread } from "@material-ui/icons";
function Users() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLogIn, setIsLogIn] = useState(localStorage.getItem("isLogIn"));
  const [friend,setFriend]=useState()
  const [isfound,setIsFound]=useState()
  const navigate = useNavigate();
console.log(friend);
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
    const res = await axios.get(
      `http://localhost:5000/conversation/search/${userInfo._id}/${friend._id}`
    );
    try {
      setIsFound(res.data)
      console.log(res.data);
      return res.data
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
                  src={friend?friend.image:""}
                />
              </div>
              <div className="chatOnlineBadge">
                <Markunread
                  onClick={ async() => { 
                   await checkConversation(userInfo,friend)?navigate("/messenger"):
                    
                      axios.post(
                      "http://localhost:5000/conversation",
                      { senderId: userInfo._id, recieverId: friend._id }
                    ).then((res)=>{
                      setFriend(friend)
                      console.log(res);
                      navigate("/messenger");
                    })
                    .catch( (err) =>{
                      console.log(err);
                    })
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
