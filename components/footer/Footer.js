import React from "react";

const Footer = () => {
  return (
    <footer className="mx-auto p-8 md:p-24 pt-0 mt-10 text-gray-700">
      <div>All images copyright © 2025 Swami Venkataramani</div>
      <div className="text-sm mt-1 ">
        Website is{" "}
        <b>
          <a href="https://svenkastudio.com" target="_blank">
            custom-designed
          </a>
        </b>{" "}
        by me.
      </div>
    </footer>
  );
};

export default Footer;
