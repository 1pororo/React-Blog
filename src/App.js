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
import React from "react";
import { useState } from "react";
import FunctionContext from "./FunctionContext";
import ThemeProvider from "./ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <FunctionContext />
    </ThemeProvider>
  );

  // return (
  //   <Router>
  //     <div className="App">
  //       <Navbar />
  //       <div className="content">
  //         <Routes>
  //           <Route path="/" element={<SignUp />} />
  //           <Route path="/login" element={<LogIn />} />
  //           <Route path="/home" element={<Home />} />
  //           <Route path="/demo" element={<Demo />} />
  //           <Route path="/create" element={<Create />} />
  //           <Route path="/update/:id" element={<Update />} />
  //           <Route path="/blogs/:id" element={<BlogDetails />} />
  //           <Route path="*" element={<NotFound />} />
  //         </Routes>
  //       </div>
  //     </div>
  //   </Router>
  // );
}
