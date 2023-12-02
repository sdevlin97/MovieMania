import React from "react";

const Tags = ({tagsAvailable, tagsSelected, onTagClick}) => {

  return (
  <>
    <div className="text-white flex items-center h-20 p-2 lg:px-4 bg-black">
      Tags:
      <div className="ml-[10px] lg:flex lg:gap-x-12 overflow-x-auto py-[14px]">
          {tagsAvailable && (
            <div className="flex space-x-4">
              {tagsAvailable.map((item) => (
                <button
                  key={item.key}
                  className=" font-bold leading-6 text-white hover:text-cyan-500 text-lg hover:transition ease-in-out duration-300 hover:-translate-y-1 "
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => onTagClick(item.key, "add")}
                >
                  |{item.key}|
                </button>
              ))}
            </div>
          )}
      </div>
    </div>
    <div className="text-white flex items-center h-20 p-2 lg:px-4 bg-black">
      Selected Tags:    
      <div className="ml-[10px] lg:flex lg:gap-x-12 overflow-x-auto py-[14px]">
        {tagsSelected && (
          <div className="flex space-x-4">
            {tagsSelected.map((item) => (
              <button
                key={item.key}
                className=" font-bold leading-6 text-white hover:text-cyan-500 text-lg hover:transition ease-in-out duration-300 hover:-translate-y-1 "
                style={{ whiteSpace: "nowrap" }}
                onClick={() => onTagClick(item, "remove")}
              >
                |{item}|
              </button>
          ))}
          </div>
        )}
      </div>
    </div>
  </>
  );
};

export default Tags;
