// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Students from "./components/Students";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/students"
          element={
            <div className="main-container">
              <div className="sidebar-container">
                <Sidebar />
              </div>
              <div className="students-container">
                <Students />
              </div>
            </div>
          }
          
        />
      </Routes>
    </Router>
  );
};

export default App;