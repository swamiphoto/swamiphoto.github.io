import React from "react";

const Footer = () => {
  return (
    <footer className="mx-auto p-8 md:p-24 pt-0 mt-10 text-gray-700">
      <div>All images copyright © 2024 Swami Venkataramani</div>
      <div className="text-sm mt-1 ">
        Designed by{" "}
        <b>
          <a href="https://svenkastudio.com" target="_blank">
            Svenka Studio
          </a>
        </b>
        .{" "}
        <span className="underlined-links">
          <a href="https://svenkastudio.com/#contact" target="_blank">
            Want a portfolio site like this?
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
