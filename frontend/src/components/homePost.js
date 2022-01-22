import React, { useState, createContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/Home.css";
import { format } from "timeago.js";

import { storage } from "./fireBase";
import {
  Search,
  Send,
  Comment,
  ThumbUp,
  PostAdd,
  Edit,
  DeleteForever,
  Check,
  Publish,
  Collections,
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
  const [description, setDescription] = useState("");
  const [done, setDone] = useState(false);
  const [press, setPress] = useState(false);
  const [toPost, setToPost] = useState(false);
  ////firebase

  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [videoAsUrl, setVideoAsUrl] = useState(allInputs);
  console.log(imageAsFile.type);
  console.log(imageAsUrl);
  console.log(videoAsUrl);
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const handleFireBaseUpload = async (e) => {
    e.preventDefault();
    console.log("start of upload");
    // async magic goes here...
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    setDone(true);
    const uploadTask = await storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);
    console.log(uploadTask);
    console.log(imageAsFile.type);

    if (imageAsFile.type === "image/jpeg" || imageAsFile.type === "image/png") {
      //initiates the firebase side uploading
      // uploadTask.on(
      //   "state_changed",
      //   (snapShot) => {
      //     //takes a snap shot of the process as it is happening
      //     console.log(snapShot);
      //   },
      //   (err) => {
      //     //catches the errors
      //     console.log(err);
      //   },
      // () => {
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
          setDone(false);
          console.log(imageAsUrl);
        });
    } else {
      storage
        .ref("images")
        .child(imageAsFile.name)
        .getDownloadURL()
        .then((fireBaseUrl) => {
          setVideoAsUrl((prevObject) => ({
            ...prevObject,
            imgUrl: fireBaseUrl,
          }));
          setDone(false);
          console.log(imageAsUrl);
        });
    }

    // }
    // );
  };

  ////////////////

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
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  marginTop: "15px",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    color: "blue",
                    justifySelf: "left",
                  }}
                >
                  {post.image ? (
                    <img
                      src={post.author.image}
                      style={{
                        borderRadius: "50%",
                        height: "40px",

                        width: "40px",
                      }}
                    />
                  ) : (
                    <img
                      style={{
                        borderRadius: "50%",
                        height: "40px",

                        width: "40px",
                      }}
                      src="https://image.shutterstock.com/image-vector/profile-icon-vector-isolated-on-260nw-1436148875.jpg"
                    ></img>
                  )}
                </div>
                <h3 style={{ marginTop: "7px", marginLeft: "10px" }}>
                  {" "}
                  {`${post.author.firstName} ${post.author.lastName}`}
                </h3>
              </div>

              <div>
                {" "}
                {post.author && post.author._id === userInfo._id ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        width: "20px",
                        alignSelf: "flex-end",
                        marginRight: "30px",
                        marginTop: "15px",
                        cursor: "pointer",
                        justifySelf: "right",
                      }}
                    >
                      <Edit
                        style={{ color: "#262626", width: "20px" }}
                        onClick={() => {
                          setPress(true);
                          setPostId(post._id);
                          setUpdateBox(!updateBox);
                        }}
                      />
                      <DeleteForever
                        style={{ color: "#262626", width: "20px" }}
                        onClick={() => {
                          axios
                            .delete(`http://localhost:5000/posts/${post._id}`)
                            .then((res) => {
                              getAllPost();
                              console.log(res);
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>

            <span
              style={{ fontSize: "10px", color: "gray", marginLeft: "50px" }}
            >
              {format(post.createdAt)}
            </span>
            {updateBox &&
            postId === post._id &&
            post.author._id === userInfo._id &&
            press ? (
              <>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    border: "1px solid rgb(225,225,220)",
                  }}
                >
                  <textarea
                    style={{ width: "90%", border: "none" }}
                    defaultValue={post.description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                  <Check
                    style={{
                      alignSelf: "center",
                      cursor: "pointer",
                      width: "40px",
                      fontSize: "50px",
                      color: "#262626",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      axios
                        .put(`http://localhost:5000/posts/${post._id}`, {
                          description,
                        })
                        .then((res) => {
                          console.log(res);
                          setDescription("");
                          setUpdateBox(!updateBox);
                          getAllPost();
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  />
                </div>
              </>
            ) : (
              <div
                style={{
                  marginTop: "15px",
                  marginLeft: "50px",
                  marginBottom: "15px",
                }}
              >
                {" "}
                {post.description}
              </div>
            )}

            <div
              className="postContainer"
              style={{
                display: "flex",
                flexDiriction: "raw",
                justifyContent: "center",
                backgroundColor: "rgb(241 241 241 / 29%)",
              }}
            >
              {/* {(<video
              style={{ width: "60%", height: "40vh" }}
              src={`${post.video}`}
            ></video>)||(<img
              style={{ width: "60%", height: "40vh" }}
              src={`${post.image}`}
            ></img>)} */}
              {post.video ? (
                <video
                  controls
                  style={{ width: "60%", height: "40vh" }}
                  src={`${post.video}`}
                ></video>
              ) : (
                <p></p>
              )}
            </div>
            <div
            id="post-container"
              style={{
                display: "flex",
                flexDiriction: "raw",
                justifyContent: "center",
                backgroundColor:"rgb(241 241 241 / 29%)"
              }}
            >
              {post.image ? (
                <img
                  style={{ width: "60%", height: "40vh" }}
                  src={`${post.image}`}
                ></img>
              ) : (
                ""
              )}
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
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            ><div style={{ marginTop: "5px" }}>
                
            <Comment
              style={{ color: "#262626", width: "20px" ,cursor:"pointer"}}
              onClick={() => {
                setCommentBox(!commentBox);
                setPostId(post._id);
                // show ? setIsShow(false) : setIsShow(true);
              }}
            />
          </div><ThumbUp
            style={{ color: "#262626", width: "20px" ,cursor:"pointer"}}
            onClick={() => {
              axios
                .put(`http://localhost:5000/posts/${post._id}/likes`, {
                  likes: post.likes + 1,
                })
                .then((res) => {
                  console.log(res);
                  getAllPost();
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          />
              <div style={{ marginTop: "8px", fontSize: "0.8em" }}>
                {post.likes}  likes
              </div>

              
              <div
                style={{
                  border: "1px solid silver",
                  width: "80%",
                  display: "felx",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <input
                  value={comment}
                  placeholder="comment"
                  style={{ border: "none", width: "90%", height: "80%",paddingLeft:"15px" }}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <Send
                  className="Send"
                  style={{
                    border: "none",
                    cursor: "pointer",
                    color: "#262626",
                    width: "10%",
                  }}
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
        {done && <div class="loader"></div>}
        <Collections
          style={{ border: "none", cursor: "pointer", color: "#262626" }}
          onClick={() => setToPost(!toPost)}
        />
        {toPost ? (
          <>
            <form onSubmit={handleFireBaseUpload}>
              <input type="file" onChange={handleImageAsFile} />
              <button>upload</button>
            </form>
          </>
        ) : (
          ""
        )}
        <PostAdd
          style={{ border: "none", cursor: "pointer", color: "#262626" }}
          onClick={() => {
            axios
              .post(
                "http://localhost:5000/posts",
                {
                  description: post,
                  video: videoAsUrl.imgUrl,
                  image: imageAsUrl.imgUrl,
                },
                { headers: { Authorization: ` Bearer ${token} ` } }
              )
              .then((response) => {
                setPost("");
                setMessage("The post has been created successfully");
                setImageAsUrl("");
                setVideoAsUrl("");
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
      <></>
      <p style={{ color: "blue" }}> {message ? message : ""}</p>
      {allPosts ? allPosts : ""}
    </div>
  );
}

export default HomePost;
