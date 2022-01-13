import React, { useState, createContext, useEffect } from "react";
import {  Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/Home.css";
import {format} from "timeago.js"


function HomePost() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLogIn, setIsLogIn] = useState(localStorage.getItem("isLogIn"));
  const [posts,setPosts]=useState()

   const allPosts=posts&&posts.map((post,index)=>{
      return(
          <><div style={{alignSelf:"flex-start", borderBottom:"1px solid white",display:"flex",flexDirection:"column" }}>
              <select style={{width:"20px", alignSelf:"flex-end",justifySelf:"flex-end"}}>
  <option >Volvo</option>
  <option  >Saab</option>
  
</select>
              <div >{`${post.author.firstName} ${post.author.lastName}`}</div>
              <div style={{fontSize:"10px"}}>{format(post.createdAt)}</div>
              <div style={{marginTop:"15px",marginLeft:"15px",marginBottom:"15px"}}>{post.description}</div>
             <div style={{border:"1px solid white"}}> {post.comments&&post.comments.map((comment,index)=>{
                  return (<><div >
                  <div>{`${comment.commenter.firstName} ${comment.commenter.lastName}`}</div>
                  <div style={{ color: "black" }}>{comment.comment}</div></div>
                  </>)
              })}</div>
            <div><input/></div> 
              </div>     
          
          </>
      )
  })
  useEffect(()=>{
      getAllPost()
  },[])
const getAllPost=()=>{
    axios
    .get("http://localhost:5000/posts/", {
      headers: { Authorization: ` Bearer ${token} ` },
    })
    .then((response) => {
        setPosts(response.data.posts)
     console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}

  
  return (
    <div className="homePost">
     {allPosts?allPosts:""}
    </div>
  );
}

export default HomePost;
