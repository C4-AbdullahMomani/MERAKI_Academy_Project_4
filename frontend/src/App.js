import React, { useState, createContext, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import "./App.css";
import Welcome from "./components/welcoming";

function App() {
  return (
    <div className="App">
     
      <Routes>
      <Route path="/" element={ <Welcome/> } />
      </Routes>
    </div>
  );
}

export default App;
