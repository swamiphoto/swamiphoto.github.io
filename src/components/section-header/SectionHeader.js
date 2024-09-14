import React from "react";

const SectionHeader = ({ title, description }) => {
  return (
    <div className="mb-8 pt-16">
      <h2 className="text-5xl font-bold tracking-tight text-gray-900">{title}</h2>
      <h4 className="text-gray-700 text-xl mt-2 max-w-2xl mx-auto tracking-tight">{description}</h4>
    </div>
  );
};

export default SectionHeader;
