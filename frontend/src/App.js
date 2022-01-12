import React, { useState, createContext, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import "./App.css";
import Welcome from "./components/welcoming";
import LogIn from "./components/login";
import Register from "./components/register";
function App() {
  return (
    <div className="App">
     
      <Routes>
      <Route path="/" element={ <Welcome/> } />
      <Route path="/login" element={ <LogIn/> } />
      <Route path="/users" element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
