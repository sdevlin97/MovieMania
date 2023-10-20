import React from "react";

const MadeList = ({ savedName, nametags, onRemove, onSelect }) => {
  const handleRemove = () => {
    onRemove(savedName);
  };

  const handleSelect = () => {
    onSelect(nametags);
  };

  return (
    <div className="ml-[10px] lg:flex lg:gap-x-12 overflow-x-auto py-[14px]">
      <div className="flex flex-col items-start">
        <div className="flex space-x-4">
          <div className="text-white bg-black" style={{ whiteSpace: "nowrap" }}>
            {savedName}:
          </div>
          {nametags.map((tag, index) => (
            <div
              key={index}
              className=" font-bold leading-6 text-white hover:text-cyan-500 text-lg hover:transition ease-in-out duration-300 hover:-translate-y-1 "
              style={{ whiteSpace: "nowrap" }}
            >
              |{tag}|
            </div>
          ))}
        </div>
        <div className="flex mt-2">
          <button
            onClick={handleRemove}
            className="text-white bg-red-500 p-1 rounded"
          >
            Remove
          </button>
          <button
            onClick={handleSelect}
            className="text-white bg-green-500 p-1 rounded ml-2"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default MadeList;
