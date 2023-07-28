import React from "react";
import { useState } from "react";

function Pop(props) {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return props.trigger ? (
    <div className="z-50 fixed top-0 left-0 w-full h-screen justify-center items-center flex">
      <div className="bg-white relative p-8 w-full max-w-max">
        <button
          onClick={() => props.setTrigger(false)}
          className="text-red-500 absolute top-0 right-0 px-2"
        >
          X
        </button>
        <div className="">
          <button
            onClick={() => handleTabClick("login")}
            className={`py-2 px-4 border-2   ${
              activeTab === "login" ? "border-red-500" : ""
            }`}
          >
            Login
          </button>
          <button
            onClick={() => handleTabClick("register")}
            className={`py-2 px-4 border-2  ${
              activeTab === "register" ? "border-red-500" : ""
            }`}
          >
            Register
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "login" && (
            <div className="text-center mb-3">
              <p>Sign in with:</p>
              {/* Login Form Inputs */}
            </div>
          )}

          {activeTab === "register" && (
            <div className="text-center mb-3">
              <p>Sign up with:</p>
              {/* Register Form Inputs */}
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
