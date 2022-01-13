import React, { useState, createContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/register.css";

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
  return (
    <>
      <div className="Register">
        <div>
          <div style={{ height: "100px" }}></div>
          <h2 style={{ color: "white", textDecoration: "underLine" }}>
            Register
          </h2>
          <input
            type={"text"}
            placeholder="First Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            type={"text"}
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            type={"email"}
            placeholder="EMAIL"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            type={"password"}
            placeholder="Password"
            onChange={(e) => {
              setPassWord(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            type={"text"}
            placeholder="Country"
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            type={"file"}
            onChange={(e) => {
              setImage(e.target.value.split("").splice(12).join(""));
            }}
          />
          <br />
          <br />
          <button
            onClick={() => {
              setSuccess(true);
              firstName && lastName && country && email && passWord && role
                ? axios
                    .post("http://localhost:5000/users/", {
                      firstName: firstName,
                      lastName: lastName,

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
          </button>{" "}
          <p style={{ color: "white" }}>{success ? message : ""}</p>
        </div>
      </div>
    </>
  );
}
// function Navigate(){

// }
export default Register;
