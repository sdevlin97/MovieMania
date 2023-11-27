// Tags.jsx
import React from "react";

const Tags = ({ availableTags, selectedTags, onTagClick }) => {
  return (
    <div className="ml-[10px]  lg:flex lg:gap-x-12 overflow-x-auto py-[14px]">
      <div className="flex space-x-4">
        {availableTags.map((item) => (
          <a
            key={item.name}
            onClick={() => onTagClick(item.name, "add")}
            className={`font-bold leading-6 text-white hover:text-cyan-500 text-lg hover:transition ease-in-out duration-300 hover:-translate-y-1`}
            style={{ whiteSpace: "nowrap" }}
          >
            |{item.name}|
          </a>
        ))}
      </div>
    </div>
  );
};

export default Tags;
