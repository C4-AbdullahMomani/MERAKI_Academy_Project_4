import React from "react";
import { format } from "timeago.js";
import "./css/message.css";
export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src="https://thumbs.dreamstime.com/b/bobcat-kitten-15843174.jpg"
          className="messageImg"
        />
        <p className="messageText">{message.message ? message.message : ""} </p>
      </div>
      <div className="messageBottom">
        {message.message ? format(message.createdAt) : ""}
      </div>
    </div>
  );
}
