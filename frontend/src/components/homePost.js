import React, { useState, createContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/Home.css";
import { format } from "timeago.js";
import UserInfo from "./userInformation";
import {
  Search,
  Send,
  Comment,
  ThumbUp,
  PostAdd,
  Edit,
  DeleteForever,
  Check
} from "@material-ui/icons";

function HomePost() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLogIn, setIsLogIn] = useState(localStorage.getItem("isLogIn"));
  const [posts, setPosts] = useState();
  const [comment, setComment] = useState();
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  console.log(userInfo);
  const [show, setIsShow] = useState(false);
  const [post, setPost] = useState();
  const [message, setMessage] = useState("");
  const [commentBox, setCommentBox] = useState(false);
  const [updateBox, setUpdateBox] = useState(false);
  const [postId, setPostId] = useState(false);
  const [description,setDescription]=useState("")
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
            {post.author && post.author._id === userInfo._id ? (
              <>
                <div
                  style={{
                    display: "flex",
                    width: "20px",
                    alignSelf: "flex-end",
                    marginRight: "30px",
                    marginTop:"15px",
                    cursor:"pointer"
                  }}
                ><div></div>
                  <Edit
                    onClick={() => {
                      setPostId(post._id);
                      setUpdateBox(!updateBox);
                    }}
                  />
                  <DeleteForever
                    onClick={() => {
                      axios
                        .delete(`http://localhost:5000/posts/${post._id}`)
                        .then((res) => {
                          getAllPost()
                          console.log(res);
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  />
                </div>
                
                {updateBox&&postId===post._id && post.author._id === userInfo._id &&(
                  <><div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                    <form style={{alignSelf:"center"}}>
                      <textarea placeholder="Post description here" value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                    </form><Check style={{alignSelf:"center",cursor:"pointer",width:"40px",fontSize:"50px"}} onClick={(e) => {
                      e.preventDefault()
                      axios.put(`http://localhost:5000/posts/${post._id}`,{ description}).then((res)=>{
                        console.log(res);
                        setDescription("")
                        setUpdateBox(!updateBox);
                        getAllPost()
                      }).catch((err)=>{
                        console.log(err);
                      })
                    }}/>
                   </div>
                  </>
                )}
              </>
            ) : (
              <p></p>
            )}
            <div
                  style={{
                    fontWeight: "bold",
                    color: "blue",
                    paddingBottom: "10px",
                  }}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png"
                    style={{
                      borderRadius: "50%",
                      height: "30px",
                      paddingTop: "5px",
                      width: "30px",
                    }}
                  />
                  {`${post.author.firstName} ${post.author.lastName}`}
                </div>
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
            <div
              style={{
                display: "flex",
                flexDiriction: "raw",
                justifyContent: "center",
                backgroundColor: "#D7D7D9",
              }}
            >
              <img
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
                style={{ width: "50%", height: "40%" }}
              />
            </div>
            <div style={{ border: "1px solid white" }}>
              {" "}
              {post.comments &&
                post.comments.map((comment, index) => {
                  return (
                    <>
                      <div id={`${index}`}>
                        {commentBox && postId === post._id ? (
                          <>
                            <div
                              style={{
                                fontWeight: "bold",
                                color: "blue",
                                fontSize: "0.7em",
                              }}
                            >{`${comment.commenter.firstName} ${comment.commenter.lastName}`}</div>
                            <div style={{ fontSize: "10px", color: "black" }}>
                              {format(comment.createdAt)}
                            </div>
                            <div
                              style={{
                                color: "black",
                                fontSize: "0.9em",
                                borderBottom: "1px solid silver",
                              }}
                            >
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                borderTop: "1px solid silver",
              }}
            >
              <div style={{ marginTop: "8px", fontSize: "0.8em" }}>
                {post.likes}likes
              </div>

              <div style={{ marginTop: "5px" }}>
                <ThumbUp />
                <Comment
                  onClick={() => {
                    setCommentBox(!commentBox);
                    setPostId(post._id);
                    // show ? setIsShow(false) : setIsShow(true);
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
                  value={comment}
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
                        setIsShow(true);
                        setComment("");
                        getAllPost();
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                ></Send>
              </div>
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
          value={post}
          name="Text1"
          cols="68"
          rows="2"
          placeholder="Post..."
          onChange={(e) => {
            setPost(e.target.value);
          }}
        ></textarea>
        <PostAdd
          onClick={() => {
            axios
              .post(
                "http://localhost:5000/posts",
                {
                  description: post,
                },
                { headers: { Authorization: ` Bearer ${token} ` } }
              )
              .then((response) => {
                setPost("");
                setMessage("The post has been created successfully");
                setTimeout(() => {
                  setMessage("");
                }, 3000);
                getAllPost();
              })
              .catch((err) => {
                setMessage(
                  "Error happened while creating a new post, please try again"
                );
                setTimeout(() => {
                  setMessage("");
                }, 3000);
              });
          }}
        />
      </div>{" "}
      <p style={{ color: "blue" }}> {message ? message : ""}</p>
      {allPosts ? allPosts : ""}
    </div>
  );
}

export default HomePost;
