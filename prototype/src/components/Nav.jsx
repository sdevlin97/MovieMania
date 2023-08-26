import React from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Logins from "./Logins";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Start", to: "#" },
  { name: "My List", to: "#" },
  { name: "Recommendations", to: "#" },
  { name: "Browse", to: "/Browse" },
];

function Nav() {
  const [ButtonPopup, setButtonPopup] = useState(false);

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
            onClick={() => setMobileMenuOpen(true)}
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
          <a
            onClick={() => setButtonPopup(true)}
            className="font-bold leading-6 text-white hover:text-cyan-500 text-lg hover:transition ease-in-out duration-300 hover:-translate-y-1"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
          <Logins trigger={ButtonPopup} setTrigger={setButtonPopup}></Logins>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
