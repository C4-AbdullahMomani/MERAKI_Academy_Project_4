import React, { useState, createContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import "./css/register.css";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lasttName, setLastName] = useState("");
  const [emailName, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");
  console.log(image)
  return (
    <>
      <div className="Register">
        <div>
          <br />
          <br />
          <input type={"text"} placeholder="First Name" onChange={(e) => {
              setFirstName(e.target.value)
          }} />
          <br />
          <br />
          <input type={"text"} placeholder="Last Name" onChange={(e) => {
              setLastName(e.target.value)
          }} />
          <br />
          <br />
          <input type={"email"} placeholder="EMAIL" onChange={(e) => {
              setEmail(e.target.value)
          }}/>
          <br />
          <br />
          <input type={"password"} placeholder="Password" onChange={(e) => {
              setPassWord(e.target.value)
          }}/>
          <br />
          <br />
          <input type={"text"} placeholder="Country" onChange={(e) => {
              setCountry(e.target.value)
          }}/>
          <br />
          <br />
          <input type={"file"} onChange={(e) => {
              setImage(e.target.value.split("").splice(12).join(""))
              
          }}/>
          <br />
          <br />
          <button onClick={()=>{
 
          }}>Register</button>{" "}
        </div>
      </div>
    </>
  );
}
// function Navigate(){

// }
export default Register;
