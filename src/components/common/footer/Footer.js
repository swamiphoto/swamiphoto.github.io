import React from "react";

const Footer = () => {
  return (
    <footer className="mx-auto p-24 pt-20 border-t mt-20">
      <div>
        <span className="font-medium mx-2">© 2023 QTR</span>
        <a href="/about" className="hover:underline mx-2 text-gray-700">
          About
        </a>
        <a href="/contact" className="hover:underline mx-2 text-gray-700">
          Contact
        </a>
      </div>
      <div className="text-xs mt-2 text-gray-600">Designed by SVENKAT Design Studios</div>
    </footer>
  );
};

export default Footer;
