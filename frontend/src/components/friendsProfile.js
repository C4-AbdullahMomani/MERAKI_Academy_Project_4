import axios from "axios";
import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./css/friendsProfile.css";
import UserInfo from "./userInformation";

function FriendsProfile({ profileId }) {
  const [posts, setPosts] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  console.log(profileId);
  console.log(profileId._id);
  const navigate=useNavigate() 
  useEffect(() => {
    const getPost = () => {
      axios
        .get(`http://localhost:5000/posts/${profileId._id}`, {
          headers: { Authorization: ` Bearer ${token} ` },
        })
        .then((res) => {
          setPosts(res.data.posts);
          console.log(res);
        })
        .catch((err) => console.log(err));
    };
    getPost();
  }, [profileId]);

  return (
    <div className="main">
      <div className="navBar"><button
            onClick={() => {
              navigate("/home");
            }}
          >
            Home
          </button></div>
      <div className="page">
        <div className="information">
          <div>
            <img src={profileId.image ? profileId.image : ""} />
          </div>
          <span className="name">
                    {profileId
                      ? `${profileId.firstName} ${profileId.lastName}`
                      : ""}
                  </span>
        </div>

        <div className="posts">
          {posts &&
            posts.map((post) => (
              <>
                <div className="post">
                  <div className="imgContainer">
                    <img
                      className="img"
                      src={profileId.image ? profileId.image : ""}
                    />
                  </div>
                  <span className="name">
                    {profileId
                      ? `${profileId.firstName} ${profileId.lastName}`
                      : ""}
                  </span>
                </div>
                <div className="text">
                  <span className="">{post ? post.description : ""}</span>
                </div><div className="photo">{post.image?(<img  src={post.image}/>):""}</div><div className="video">{post.video?(<video  src={post.video}/>):""}</div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

export default FriendsProfile;




