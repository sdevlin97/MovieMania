// Logins.jsx

import React, { useState } from "react";
import { Slide, ToastContainer, toast } from 'react-toastify';
import { createAccount, logIntoExistingAccount, logout, auth } from "../firebase.js"

function Logins({ trigger, setTrigger, handleLogin, handleSignup }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Added state to track login/signup mode\

  const handleClose = () => {
    setTrigger(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin(email, password);
      logIntoExistingAccount(auth, email, password);
    } else {
      // Add your signup logic here
      handleSignup(username, email, password);
      createAccount(auth, username, email, password);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        trigger ? "z-[51]" : "hidden"
      }`}
    >
      <div className="p-4 rounded-lg shadow-lg backdrop-blur-lg border border-cyan-300">
        <h2 className="text-xl font-bold mb-4 text-cyan-500">
          {isLogin ? "Login" : "Signup"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded w-full py-2 px-3 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full py-2 px-3 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold mb-2 ">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full py-2 px-3 text-black "
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={toggleMode}
        >
          Switch to {isLogin ? "Signup" : "Login"}
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Logins;
