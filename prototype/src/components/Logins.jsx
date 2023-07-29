import React from "react";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

function Logins(props) {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return props.trigger ? (
    <div className="z-50 fixed top-0 left-0 w-full h-screen justify-center items-center flex">
      <div className="backdrop-blur-lg rounded-xl relative p-8 w-full max-w-max border border-cyan-700">
        <button
          onClick={() => props.setTrigger(false)}
          className=" absolute top-0 right-0 px-2 text-white border"
        >
          X
        </button>

        <div className="tab-content">
          {activeTab === "login" && (
            <div className="mb-2 mt-2">
              <div className="mb-2">
                <label for="email" className=" text-cyan-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className=" text-white border bg-transparent border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-300"
                />
                <i className="fa-solid fa-envelope text-cyan-300 absolute my-3 -mx-7"></i>
              </div>

              <div className="mb-4">
                <label for="password" className="block text-cyan-300">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="border text-white bg-transparent border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-300"
                />
                <i class="fa-solid fa-lock text-cyan-300 absolute my-3 -mx-7"></i>
              </div>
              <button
                className={`w-full h-10 bg-cyan-600 rounded-md font-medium text-[1em] text-white mb-2
                ${activeTab === "login" ? "focus:border-green-300" : ""}`}
              >
                Login
              </button>

              <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
              <button onClick={() => handleTabClick("register")}>
                <div className="absolute text-white bottom-3 left-8">
                  Don't have an account?
                  <span className=" font-semibold"> Register</span>
                </div>
              </button>
            </div>
          )}

          {activeTab === "register" && (
            <div className="mb-3">
              <div className="mb-2 mt-2">
                <label for="name" className="block text-cyan-300">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="border text-white bg-transparent  border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-300"
                />
                <i className="fa-solid fa-user text-cyan-300 absolute my-3 -mx-7"></i>
              </div>

              <div className="mb-2">
                <label for="email" className="block text-cyan-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="border text-white bg-transparent border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-300"
                />
                <i className="fa-solid fa-envelope text-cyan-300 absolute my-3 -mx-7"></i>
              </div>

              <div className="mb-4">
                <label for="password" className="block text-cyan-300">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="border text-white bg-transparent border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-300"
                />
                <i class="fa-solid fa-lock text-cyan-300 absolute my-3 -mx-7"></i>
              </div>

              <div className="mb-4">
                <label for="terms" className="flex items-center text-cyan-300">
                  <input
                    type="checkbox"
                    name="flexCheck"
                    id="terms"
                    className="form-checkbox border   border-gray-400 rounded-md text-blue-300 focus:outline-none focus:border-blue-300"
                  />
                  <span className="ml-2">
                    I have read and agree to the terms
                  </span>
                </label>
              </div>
              <button
                className={`w-full h-10 bg-cyan-600 rounded-md font-medium text-[1em] text-white mb-2
                ${activeTab === "login" ? "focus:border-green-300" : ""}`}
              >
                Create Account
              </button>

              <GoogleLogin
                onSuccess={responseMessage}
                onError={errorMessage}
                text="signup_with"
              />
              <button onClick={() => handleTabClick("login")}>
                <div className="absolute text-white bottom-3 left-8">
                  Already have a account?{" "}
                  <span className=" font-semibold">Login</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Logins;
