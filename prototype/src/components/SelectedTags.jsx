// SelectedTags.jsx
import React from "react";

const SelectedTags = ({ selectedTags, onTagClick }) => {
  return (
    <div className="ml-[10px]  lg:flex lg:gap-x-12 overflow-x-auto py-[14px]">
      <div className="flex space-x-4">
        {selectedTags.map((item) => (
          <a
            key={item}
            onClick={() => onTagClick(item, "remove")}
            className=" font-bold leading-6 text-white hover:text-cyan-500 text-lg hover:transition ease-in-out duration-300 hover:-translate-y-1 "
            style={{ whiteSpace: "nowrap" }}
          >
            |{item}|
          </a>
        ))}
      </div>
    </div>
  );
};

export default SelectedTags;
