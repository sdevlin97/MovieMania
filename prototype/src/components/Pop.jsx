import React from "react";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

function Pop(props) {
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
      <div className="backdrop-blur rounded-xl relative  p-8 w-full max-w-max border border-cyan-700">
        <button
          onClick={() => props.setTrigger(false)}
          className=" absolute top-0 right-0 px-2 text-white"
        >
          X
        </button>
        <div className="div for login and reg">
          <button
            onClick={() => handleTabClick("login")}
            className={`py-2 px-4 border-2 text-cyan-500 border-red-500 focus:border-green-500 ${
              activeTab === "login" ? "focus:border-green-500" : ""
            }`}
          >
            Login
          </button>
          <button
            onClick={() => handleTabClick("register")}
            className={`py-2 px-4 border-2 rounded-lg text-cyan-500 ${
              activeTab === "register" ? "border border-cyan-500" : ""
            }`}
          >
            Register
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "login" && (
            <div className="text-center mb-3 text-cyan-500">
              <p>Sign in with:</p>
              <h></h>
              <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </div>
          )}

          {activeTab === "register" && (
            <div className="text-center mb-3">
              <p>Sign up with:</p>
              <div className="mb-4">
                <label for="name" className="block text-cyan-500">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="border border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label for="username" className="block text-cyan-500 ">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className=" px-4 py-2 w-full rounded-md  focus:border-white focus:border-4"
                />
              </div>

              <div className="mb-4">
                <label for="email" className="block text-cyan-500">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="border border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label for="password" className="block text-cyan-500">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="border border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label for="terms" className="flex items-center text-cyan-500">
                  <input
                    type="checkbox"
                    name="flexCheck"
                    id="terms"
                    className="form-checkbox border  border-gray-400 rounded-md text-blue-500 focus:outline-none focus:border-blue-500"
                  />
                  <span className="ml-2">
                    I have read and agree to the terms
                  </span>
                </label>
              </div>

              <GoogleLogin
                onSuccess={responseMessage}
                onError={errorMessage}
                text="signup_with"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Pop;
