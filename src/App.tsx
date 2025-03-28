import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/Users";
import EditUser from "./pages/EditUser";
import "./index.css"
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const isAuthenticated = () => {
    return !!localStorage.getItem("token"); // Change this logic if needed
  };
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated() ? "/users" : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
};

export default App;
