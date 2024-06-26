import React from "react";
import { useAuth } from "./contexts/AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleClick() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div className="w-100 text-center border  border-solid">
        {error && <>{error}</>}
        <h2>Profile</h2>
        <strong>Email:</strong> {currentUser && currentUser.email}
        <div>
          <Link to="/edit-profile">Edit profile</Link>
        </div>
      </div>
      <button
        onClick={handleClick}
        className="bg-purple-1000 hover:bg-purple-1050  rounded-lg text-white border"
      >
        Log Out
      </button>
    </>
  );
}
