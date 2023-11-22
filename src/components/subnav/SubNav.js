import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Select } from "antd";
import "./SubNav.css";
const { Option } = Select;

const SubNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navLinks = [
    { name: "Landscapes", path: "/" },
    { name: "Portraits", path: "/portraits" },
    { name: "Bollywood", path: "/bollywood" },
    { name: "Tennis", path: "/tennis" },
  ];

  const handleChange = (value) => {
    navigate(value);
  };

  return (
    <div>
      <ul className="hidden sm:flex flex-col items-center justify-center h-full space-y-4 md:flex-row md:space-y-0 md:space-x-6 md:h-auto font-geist-mono">
        {navLinks.map((link, index) => (
          <li key={index}>
            <a className={`text-gray-800 transition hover:text-gray-900 font-medium ${location.pathname === link.path ? "text-red-500" : ""}`} href={link.path}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
      <Select className="sm:hidden w-3/5" defaultValue={location.pathname} onChange={handleChange}>
        {navLinks.map((link, index) => (
          <Option key={index} value={link.path}>
            {link.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SubNav;
