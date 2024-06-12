import Navbar from "./Navbar";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from "./Create";
import BlogDetails from "./BlogDetails";
import NotFound from "./NotFound";
import Demo from "./Demo";
import Update from "./Update";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Dashboard from "./Dashboard";
import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
import PasswordReset from "./PasswordReset";
import EditProfile from "./EditProfile";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute element={<Dashboard />} redirect="/login" />
                }
              />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/home" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/create" element={<Create />} />
              <Route path="/update/:id" element={<Update />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}
