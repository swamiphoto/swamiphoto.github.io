import React, { useState } from "react";
import logo from "../../../../src/assets/images/avatar_camera.jpg";
import { Link } from "react-scroll";
import "./Header.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { TfiClose } from "react-icons/tfi";
import { Popover } from "antd";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenChange = (newOpenState) => {
    setIsOpen(newOpenState);
  };

  return (
    <header className="bg-slate-100 sticky top-0 z-20 animate-fadeIn">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="block text-teal-600" href="/">
          <img src={logo} alt="QTR logo" className="h-8" />
        </a>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          {/* Mobile Menu - Full width with white background */}
          <nav aria-label="Global" className={`${isMenuOpen ? "block" : "hidden"} fixed inset-0 bg-white z-30 md:relative md:block md:bg-transparent`}>
            <TfiClose onClick={toggleMenu} className={`h-5 w-5 absolute top-5 right-5 transition-opacity md:hidden ${isMenuOpen ? "opacity-100" : "opacity-0"}`} />
            <ul className="flex flex-col items-center justify-center h-full space-y-4 md:flex-row md:space-y-0 md:space-x-6 md:h-auto">
              <li>
                <a className="text-gray-800 transition hover:text-gray-900" href="/">
                  Home
                </a>
              </li>
              <li>
                <Link className="cursor-pointer text-gray-800 transition hover:text-gray-900" to="features" spy={true} activeClass="active-link" smooth={true} duration={500}>
                  Features
                </Link>
              </li>
              <li>
                <Link className="cursor-pointer text-gray-800 transition hover:text-gray-900" to="system" spy={true} activeClass="active-link" smooth={true} duration={500}>
                  The System
                </Link>
              </li>
              <li>
                <Link className="cursor-pointer text-gray-800 transition hover:text-gray-900" to="pricing" spy={true} activeClass="active-link" smooth={true} duration={500}>
                  Pricing
                </Link>
              </li>
              <li className="md:hidden">
                <Link className="cursor-pointer text-gray-800 transition hover:text-gray-900" to="pricing" spy={true} activeClass="active-link" smooth={true} duration={500}>
                  Login
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a className="hidden rounded-md bg-gray-100 px-3 py-2.5 text-sm font-medium text-gray-800 transition hover:text-gray-900 sm:block" href="/login">
                Login
              </a>

              <button className="rounded bg-purple-700 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-purple-800">
                <span>Sign Up</span>
              </button>
            </div>

            <button onClick={toggleMenu} className={`block rounded p-2.5 text-gray-600 transition md:hidden ${isMenuOpen ? "open" : ""}`}>
              <span className="sr-only">Toggle menu</span>
              <RxHamburgerMenu className={`h-5 w-5 transition-transform ${isMenuOpen ? "hidden" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
