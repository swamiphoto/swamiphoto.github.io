import React from "react";
import WiggleLine from "../wiggle-line/WiggleLine"; // Adjust the import if necessary

// Layout 1: Wiggle lines on top and bottom, default text size
const TextLayout1 = ({ children }) => (
  <div className="flex justify-center items-center h-auto py-16">
    <div className="text-2xl md:text-3xl max-w-3xl px-4">
      <WiggleLine />
      <blockquote className="my-10 text-xl leading-8 tracking-tight sm:text-2xl sm:leading-9">{children}</blockquote>
      <WiggleLine />
    </div>
  </div>
);

// Layout 2: Larger text, wiggle line only on bottom
const TextLayout2 = ({ children }) => (
  <div className="flex justify-center items-center h-auto py-16">
    <div className="text-2xl md:text-4xl max-w-3xl px-4">
      <blockquote className="my-10 leading-8 tracking-tight sm:leading-10">{children}</blockquote>
      <WiggleLine />
    </div>
  </div>
);

// Main Text component that selects between layouts
const Text = ({ children, layout = "layout1" }) => {
  if (layout === "layout1") {
    return <TextLayout1>{children}</TextLayout1>;
  } else if (layout === "layout2") {
    return <TextLayout2>{children}</TextLayout2>;
  }
  return null; // Fallback if an unknown layout is passed
};

export default Text;
