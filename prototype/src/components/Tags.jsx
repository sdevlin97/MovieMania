import React from "react";
const tags = [
  { name: "Horror" },
  { name: "Adventure" },
  { name: "Animals" },
  { name: "Games" },
  { name: "Paper" },
  { name: "Tech" },
  { name: "Forrest" },
  { name: "Food" },
];
const Tags = () => {
  return (
    <div className=" ml-[10px] hidden lg:flex lg:gap-x-12">
      {tags.map((item) => (
        <a
          key={item.name}
          className=" font-bold leading-6 text-white hover:text-cyan-500 text-lg hover:transition ease-in-out duration-300 hover:-translate-y-1"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};

export default Tags;
