import React from "react";
import WiggleLine from "../wiggle-line/WiggleLine";

const Text = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-auto py-16">
      <div className="text-2xl md:text-3xl max-w-3xl px-4">
        <WiggleLine />

        <blockquote className="my-10 text-xl leading-8 tracking-tight sm:text-2xl sm:leading-9">{children}</blockquote>
        <WiggleLine />
      </div>
    </div>
  );
};

export default Text;
