import React, { Component } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Start", href: "#" },
  { name: "My List", href: "#" },
  { name: "Recommendations", href: "#" },
  { name: "Browse", href: "#" },
];

class Nav extends Component {
  render() {
    return (
      <header className="absolute inset-0 z-50 text-white">
        <nav className="flex items-center justify-between h-20 p-2 lg:px-4 ">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className=" h-20 w-30"
                src="./logo-no-background.png"
                alt=""
              />
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
              <a
                key={item.name}
                href={item.href}
                className=" font-bold leading-6 text-white hover:text-red-500 text-lg hover:transition ease-in-out duration-300 hover:-translate-y-1"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="font-bold leading-6 text-white hover:text-red-500 text-lg hover:transition ease-in-out duration-300 hover:-translate-y-1"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>
    );
  }
}

export default Nav;
