import React, { useState, createContext, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import "./App.css";
import Welcome from "./components/welcoming";
import LogIn from "./components/login";
function App() {
  return (
    <div className="App">
     
      <Routes>
      <Route path="/" element={ <Welcome/> } />
      <Route path="/login" element={ <LogIn/> } />
      </Routes>
    </div>
  );
}

export default App;
