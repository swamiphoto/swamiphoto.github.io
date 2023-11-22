import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { TfiClose } from "react-icons/tfi";
import IMAGES from "../../common/images";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const linkStyle = (path) => (location.pathname === path ? "font-bold underline" : "text-gray-500");

  return (
    <header className="bg-gray-200 sticky top-0 z-20 w-full header">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 w-full">
        <a className="block text-teal-600" href="/">
          <img src={IMAGES.logo} alt="Logo" className="h-4" />
        </a>
        <div className="flex items-center">
          <nav aria-label="Global" className={`${isMenuOpen ? "block" : "hidden"} nav fixed inset-0 bg-gray-100 z-30 md:relative md:block md:bg-transparent`}>
            <TfiClose onClick={toggleMenu} className={`h-5 w-5 absolute top-5 right-5 transition-opacity md:hidden ${isMenuOpen ? "opacity-100" : "opacity-0"}`} />
            <ul className="flex flex-col items-center justify-center h-full space-y-4 md:flex-row md:space-y-0 md:space-x-6 md:h-auto">
              <li>
                <a className={`transition hover:text-gray-900 font-medium ${linkStyle("/")}`} href="/">
                  Portfolio
                </a>
              </li>
              <li>
                <a className={`transition hover:text-gray-900 font-medium ${linkStyle("/headshots")}`} href="/headshots">
                  Headshots
                </a>
              </li>
              <li>
                <a className={`transition hover:text-gray-900 font-medium ${linkStyle("/podcast")}`} href="https://swamiphoto.substack.com" target="_blank" rel="noreferrer">
                  Podcast
                </a>
              </li>
              <li>
                <a className={`transition hover:text-gray-900 font-medium ${linkStyle("/about")}`} href="/about">
                  About
                </a>
              </li>
            </ul>
          </nav>
          <button onClick={toggleMenu} className={`block rounded p-2.5 text-gray-600 transition md:hidden ${isMenuOpen ? "open" : ""}`}>
            <span className="sr-only">Toggle menu</span>
            <RxHamburgerMenu className={`h-5 w-5 transition-transform ${isMenuOpen ? "hidden" : ""}`} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
