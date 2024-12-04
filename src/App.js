import "./App.css";
import React from "react";
import Navbar from "./components/inc/navbar";
import Homepage from "./components/pages/Homepage";

import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  
  return (
    <div className="bg-black text-light min-vh-100 ">
       <Homepage />
     
    </div>
  );
}

export default App;
