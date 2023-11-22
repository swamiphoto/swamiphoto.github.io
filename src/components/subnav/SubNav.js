import React from "react";
import { useLocation } from "react-router-dom";

const SubNav = () => {
  const location = useLocation();
  const navLinks = [
    { name: "Landscapes", path: "/" },
    { name: "Portraits", path: "/portraits" },
    { name: "Bollywood", path: "/bollywood" },
    { name: "Tennis", path: "/tennis" },
  ];

  const isSelected = (path) => location.pathname === path;

  return (
    <ul className="flex flex-col items-center justify-center h-full space-y-4 md:flex-row md:space-y-0 md:space-x-6 md:h-auto font-geist-mono">
      {navLinks.map((link, index) => (
        <li key={index}>
          <a className={`text-gray-800 transition hover:text-gray-900 font-medium ${isSelected(link.path) ? "text-red-500" : ""}`} href={link.path}>
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SubNav;
