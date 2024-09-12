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
      <ul className="hidden md:flex flex-col items-center justify-center h-full space-y-4 md:flex-row md:space-y-0 md:space-x-6 md:h-auto font-medium text-gray-500">
        {navLinks.map((link, index) => (
          <li key={index}>
            <a className={`${location.pathname === link.path ? "text-gray-900 underline" : ""}`} href={link.path}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
      <Select className="md:hidden w-3/5" defaultValue={location.pathname} onChange={handleChange} size="large">
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
