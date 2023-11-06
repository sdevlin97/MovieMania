import React from "react";

const DevTag = ({ selectedTags }) => {
  return (
    <div className="ml-[10px] lg:flex lg:gap-x-12 overflow-x-auto py-[14px]">
      <div className="flex space-x-4">
        {selectedTags.map((tag, index) => (
          <div
            key={index}
            className=" font-bold leading-6 text-white bg-green-500 text-lg p-1 rounded"
            style={{ whiteSpace: "nowrap" }}
          >
            |{tag}|
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevTag;
