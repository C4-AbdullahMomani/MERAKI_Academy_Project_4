import React, { useState, createContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/register.css";
import { storage } from "./fireBase";
import Texting from './css/Texting.gif'

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState();
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("61dcdf48b149561499f8fb85");
  console.log(image);
  const navigate = useNavigate();

  ////firebase

  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  console.log(imageAsFile);
  
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };
  
  const handleFireBaseUpload = e => {
    e.preventDefault()
  console.log('start of upload')
  // async magic goes here...
  if(imageAsFile === '') {
    console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
  }
  const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
  //initiates the firebase side uploading 
  uploadTask.on('state_changed', 
  (snapShot) => {
    //takes a snap shot of the process as it is happening
    console.log(snapShot)
  }, (err) => {
    //catches the errors
    console.log(err)
  }, () => {
    // gets the functions from storage refences the image storage in firebase by the children
    // gets the download url then sets the image from firebase as the value for the imgUrl key:
    storage.ref('images').child(imageAsFile.name).getDownloadURL()
     .then(fireBaseUrl => {
       setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
       console.log(imageAsUrl);
     })
  })
  }






////////////////

  return (
    <>






    {/*  -------------------------------------------------------------------------- */}
      <div className="Register"><img className="image" src={Texting}/>
        <div className="reg">
          <div style={{ height: "50px" }}></div><form>
          <h2 style={{ color: "blue", textDecoration: "underLine" }}>
            Register
          </h2>
          <input
            type={"text"}
            placeholder="First Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          
          
          <input
            type={"text"}
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          
        
          <input
            type={"email"}
            placeholder="EMAIL"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
         
        
          <input
            type={"password"}
            placeholder="Password"
            onChange={(e) => {
              setPassWord(e.target.value);
            }}
          />
         
          
          <input
            type={"text"}
            placeholder="Country"
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
         
        
          <form onSubmit={handleFireBaseUpload}>
              <input type="file" onChange={handleImageAsFile} />
              <button>upload</button>
            </form>
          
        
          <button
            onClick={() => {
              setSuccess(true);
              firstName && lastName && country && email && passWord && role
                ? axios
                    .post("http://localhost:5000/users/", {
                      firstName: firstName,
                      lastName: lastName,
                      image:imageAsUrl.imgUrl,
                      country: country,
                      email: email,
                      passWord: passWord,
                      role: role,
                    })
                    .then((response) => {
                      console.log(response);
                      setMessage("The user has been created successfully");
                      setFirstName("");
                      setLastName("");
                      setEmail("");
                      setPassWord("");
                      setCountry("");
                      setImage("");
                      setTimeout(() => {
                        navigate("/login");
                      }, 3000);
                    })
                    .catch((err) => {
                      setMessage(err.response.data.message);
                    })
                : setMessage("Error happened while register, please try again");
            }}
          >
            Register
          </button>{" "}</form>
          <p style={{ color: "white" }}>{success ? message : ""}</p>
        </div>
        <div></div>
      </div>
    </>
  );
}
// function Navigate(){

// }
export default Register;
