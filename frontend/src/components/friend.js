import React from "react";
import "./css/friend.css";
export default function Friend() {
  return (
    <div className="chatOnLine">
      <div className="chatFriend">
        <div className="imgContainer">
          <img
            className="img"
            src="https://thumbs.dreamstime.com/b/bobcat-kitten-15843174.jpg"
          />
        </div>
        <div className="chatOnlineBadge"></div>
        <span className="chatOnlineName">momani</span>
      </div>
    </div>
  );
}
