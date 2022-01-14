import React, { useState, createContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/Home.css";
import { format } from "timeago.js";
import UserInfo from "./userInformation";
import { Search, Send, Comment, ThumbUp } from "@material-ui/icons";

function HomePost() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLogIn, setIsLogIn] = useState(localStorage.getItem("isLogIn"));
  const [posts, setPosts] = useState();
  const [comment, setComment] = useState();
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [show, setIsShow] = useState(false);
  const allPosts =
    posts &&
    posts.map((post, index) => {
      return (
        <>
          <div
            style={{
              alignSelf: "flex-start",
              borderBottom: "1px solid silver",
              display: "flex",
              flexDirection: "column",
              marginLeft: "15px",
              borderTop: "1px solid silver",
            }}
          >
            {post.author._id === userInfo._id ? (
              <select
                style={{
                  width: "20px",
                  alignSelf: "flex-end",
                  justifySelf: "flex-end",
                }}
              >
                <option>Update</option>
                <option>Delete</option>
              </select>
            ) : (
              <p></p>
            )}
            <div>{`${post.author.firstName} ${post.author.lastName}`}</div>
            <div style={{ fontSize: "10px", color: "black" }}>
              {format(post.createdAt)}
            </div>
            <div
              style={{
                marginTop: "15px",
                marginLeft: "15px",
                marginBottom: "15px",
              }}
            >
              {post.description}
            </div>
            <div style={{ border: "1px solid white" }}>
              {" "}
              {post.comments &&
                post.comments.map((comment, index) => {
                  return (
                    <>
                      <div>
                        {show ? (
                          <>
                            <div>{`${comment.commenter.firstName} ${comment.commenter.lastName}`}</div>
                            <div style={{ color: "black" }}>
                              {comment.comment}
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </>
                  );
                })}
            </div>
            <div>
              <ThumbUp />
              <Comment
                onClick={() => {
                  show ? setIsShow(false) : setIsShow(true);
                }}
              />
            </div>
            <div
              style={{
                border: "1px solid silver",
                width: "80%",

                display: "felx",
                flexDirection: "row",
                justifyContent: "right",
              }}
            >
              <input
                placeholder="comment"
                style={{ border: "none", width: "90%", height: "20px" }}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <Send
                style={{ border: "none", justifySelf: "right" }}
                onClick={() => {
                  axios
                    .post(
                      `http://localhost:5000/posts/${post._id}/comments`,
                      {
                        comment: comment,
                      },
                      {
                        headers: { Authorization: ` Bearer ${token} ` },
                      }
                    )
                    .then((response) => {
                      getAllPost();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              ></Send>
              {/* <button
                style={{ border: "none", justifySelf: "right" }}
                onClick={() => {
                    axios
                .post(
                  `http://localhost:5000/posts/${post._id}/comments`,
                  {
                    comment: comment,
                  },
                  {
                    headers: { Authorization: ` Bearer ${token} ` },
                  }
                )
                .then(async(response) => {
                   
                  
                 await getAllPost()
                   setComment(" ")
                  
                })
                .catch((err) => {
                  console.log(err);
                });
                }}
              >
                comment
              </button> */}
            </div>
          </div>
        </>
      );
    });
  useEffect(() => {
    getAllPost();
  }, []);
  const getAllPost = () => {
    axios
      .get("http://localhost:5000/posts/", {
        headers: { Authorization: ` Bearer ${token} ` },
      })
      .then((response) => {
        setPosts(response.data.posts);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="homePost">
      <div className="textArea">
        <textarea
          name="Text1"
          cols="68"
          rows="2"
          placeholder="Post..."
        ></textarea>
        <button>Post</button>
      </div>
      {allPosts ? allPosts : ""}
    </div>
  );
}

export default HomePost;
