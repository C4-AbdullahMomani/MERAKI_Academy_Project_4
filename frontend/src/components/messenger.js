import React, { useState, createContext, useEffect, useRef } from "react";
import { Link, useHref, useNavigate } from "react-router-dom";
import Conversations from "./conversations";
import Message from "./message";
import "./css/messenger.css";
import Friend from "./friend";
import axios from "axios";
function Messenger(own) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLogIn, setIsLogIn] = useState(localStorage.getItem("isLogIn"));
  const [user, setUser] = useState();
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [conversation, setConversation] = useState();
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();
  useEffect(() => {
    const getMessages = async () => {
      const res = await axios.get(
        `http://localhost:5000/message/${currentChat?._id}`
      );
      try {
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    const getConversation = async (e) => {
      const res = await axios.get(
        `http://localhost:5000/conversation/${userInfo._id}`
      );
      try {
        console.log(res);
        setConversation(res.data);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/message", {
      message: newMessage,
      sender: userInfo._id,
      conversationId: currentChat._id,
    });
    try {
      setNewMessage("");
      setMessages([...messages, res.data]);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="message">
      <div className="navBar"></div>
      <div className="container">
        <div className="sideBar">
          <div className="chatMenue">
            {conversation &&
              conversation.map((c) => (
                <div onClick={() => setCurrentChat(c)}>
                  <Conversations conversation={c} />
                </div>
              ))}
          </div>
        </div>
        <div className="chat">
          <div className="chatBox">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages &&
                    messages.map((m) => (
                      <div ref={scrollRef}>
                        <Message own={m.sender === userInfo._id} message={m} />
                      </div>
                    ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatInput"
                    placeholder="message..."
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                    }}
                    value={newMessage}
                  ></textarea>
                  <button className="chatButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noChat">open aconversation to start a chat</span>
            )}
          </div>
        </div>
        <div className="right">
          <div className="member">
            <Friend />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messenger;
