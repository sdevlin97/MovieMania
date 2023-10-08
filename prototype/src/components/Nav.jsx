// Nav.jsx

import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Logins from "./Logins";
import {logout, auth} from "../firebase.js"

const navigation = [
  { name: "Start", to: "/" },
  { name: "My List", to: "/MyList" },
  { name: "Recommendations", to: "#" },
  { name: "Browse", to: "/Browse" },
];

function Nav() {
  const [ButtonPopup, setButtonPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

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
    <div
      className={`inset-0 ${
        ButtonPopup ? "z-[50]" : "z-[0]"
      } text-white bg-cyan-950`}
    >
      <nav className="flex items-center justify-between h-20 p-2 lg:px-4 ">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className=" h-20 w-30" src="./logo-no-background.png" alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 bg-black mr-4"
            onClick={() => setButtonPopup(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
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
              <span className="mr-2">Welcome, {username}</span>
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
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>
      </nav>
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
