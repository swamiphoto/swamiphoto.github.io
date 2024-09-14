import React from "react";
import WiggleLine from "../wiggle-line/WiggleLine";

const Text = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-auto py-16">
      <div className="text-left font-serif text-2xl md:text-3xl max-w-3xl px-4">
        {/* Wiggle Line Above */}
        <WiggleLine />

        {/* The text content */}
        {children}

        {/* Wiggle Line Below */}
        <WiggleLine />
      </div>
    </div>
  );
};

export default Text;
