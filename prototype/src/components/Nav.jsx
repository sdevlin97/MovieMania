import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logins from "./Logins";
import {logout, auth} from "../firebase.js"

const navigation = [
  { name: "Start", to: "/" },
  { name: "My Lists", to: "/MyList" },
  { name: "Recommendations", to: "/Recommendations" },
  { name: "Browse", to: "/Browse" },
];

function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [ButtonPopup, setButtonPopup] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
    setButtonPopup(false);
  };

  const handleSignup = (username, email, password) => {
    // Add your signup logic here
    // ...

    // Simulate a login after signup
    handleLogin(username);
  };

  const handleLogout = () => {
    setUsername("");
    setIsLoggedIn(false);
    logout()
  };

  return (
    <div className="bg-cyan-950">
      <nav className="container mx-auto p-2  h-20 flex justify-between items-center">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <img className=" h-20 w-30" src="./logo-no-background.png" alt="" />
          </a>
        </div>
        <div className="lg:hidden">
          <button
            onClick={toggleDropdown}
            className="text-white hover:text-cyan-500 focus:outline-none"
          >
            ☰
          </button>
        </div>
        <div className="hidden lg:flex space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className=" font-bold leading-6 text-white hover:text-cyan-500 text-lg hover:transition ease-in-out duration-300 hover:-translate-y-1"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn ? (
            <div className="flex items-center">
              <span className="mr-2 text-white">Welcome, {username}</span>
              <button
                onClick={handleLogout}
                className="font-bold leading-6 text-white hover:text-cyan-500 text-lg hover:transition ease-in-out duration-300 hover:-translate-y-1"
              >
                Logout
              </button>
            </div>
          ) : (
            <a
              onClick={() => setButtonPopup(true)}
              className="font-bold leading-6 text-white hover:text-cyan-500 text-lg hover:transition ease-in-out duration-300 hover:-translate-y-1"
            >
              Log in
              <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>
      </nav>
      {isDropdownOpen && (
        <div className="lg:hidden bg-cyan-950">
          <div className="container mx-auto py-4 flex flex-col items-center space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="text-white hover:text-cyan-500"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      <Logins
        trigger={ButtonPopup}
        setTrigger={setButtonPopup}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
      />
    </div>
  );
}

export default Nav;
