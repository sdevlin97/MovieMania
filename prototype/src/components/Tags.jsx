import React from "react";
const tags = [
  { name: "Superhero" },
  { name: "Adventure" },
  { name: "Action" },
  { name: "Dark" },
  { name: "DC" },
  { name: "Marvel" },
  { name: "Comic" },
  { name: "Secret" },
  { name: "Romance" },
  { name: "Science Fiction" },
  { name: "Fantasy" },
  { name: "Horror" },
  { name: "Comedy" },
  { name: "Drama" },
  { name: "Thriller" },
  { name: "Mystery" },
  { name: "Animation" },
  { name: "Family" },
  { name: "Historical" },
  { name: "Western" },
  { name: "Musical" },
  { name: "War" },
  { name: "Spy" },
  { name: "Post-Apocalyptic" },
  { name: "Time Travel" },
  { name: "Aliens" },
  { name: "Robots" },
  { name: "Magical" },
  { name: "Sports" },
  { name: "Heist" },
  { name: "Supernatural" },
  { name: "Coming of Age" },
  { name: "Disaster" },
];

const Tags = () => {
  return (
    <div className="ml-[10px]  lg:flex lg:gap-x-12 overflow-x-auto py-[14px]">
      <div className="flex space-x-4">
        {tags.map((item) => (
          <a
            key={item.name}
            className=" font-bold leading-6 text-white hover:text-cyan-500 text-lg hover:transition ease-in-out duration-300 hover:-translate-y-1 "
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
