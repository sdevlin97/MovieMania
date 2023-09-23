// Logins.jsx

import React, { useState } from "react";

function Logins({ trigger, setTrigger, handleLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Added state for email
  const [password, setPassword] = useState("");

  const handleClose = () => {
    setTrigger(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here (e.g., sending data to a server)
    // Example:
    handleLogin(username, email);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        trigger ? "z-[51]" : "hidden"
      }`}
    >
      <div className="p-4 rounded-lg shadow-lg backdrop-blur-lg">
        <h2 className="text-xl font-bold mb-4 text-cyan-500">Login</h2>
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
            Login
          </button>
        </form>
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
