import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <section
        className="flex justify-center items-center min-h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('background6.jpg')" }}
      >
        <div className="form-box relative w-400px h-450px bg-transparent border-2 border-white border-opacity-50 rounded-20 backdrop-blur-15 flex justify-center items-center">
          <form className="w-full">
            <h2 className="text-white text-2xl mb-5">Login</h2>
            <div className="inputbox relative mb-8">
              <i className="fa-regular fa-envelope absolute right-8 text-white text-1.2em top-20"></i>
              <input
                type="email"
                required
                className="w-full h-50px bg-transparent border-none outline-none text-white text-1em pr-35px pl-5"
              />
              <label className="absolute top-1/2 left-5 transform -translate-y-1/2 text-white text-1em pointer-events-none transition-all">
                Email
              </label>
            </div>
            <div className="inputbox relative mb-8">
              <input
                type="password"
                required
                className="w-full h-50px bg-transparent border-none outline-none text-white text-1em pr-35px pl-5"
              />
              <label className="absolute top-1/2 left-5 transform -translate-y-1/2 text-white text-1em pointer-events-none transition-all">
                Password
              </label>
            </div>
            <div className="forget mb-15 text-white text-sm flex justify-between">
              <label>
                <input type="checkbox" className="mr-3" />
                Remember Me{" "}
                <a href="#" className="text-white">
                  Forget Password
                </a>
              </label>
            </div>
            <button className="w-full h-40px rounded-40 bg-white border-none outline-none cursor-pointer text-white text-1em font-semibold">
              Log in
            </button>
            <div className="register mt-25 text-white text-sm text-center">
              <p>
                Don't have an account{" "}
                <a href="#" className="text-white font-semibold">
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default Login;
